import { BAD_REQUEST } from '../../lib/constants/api';
import { getCurrentAccount } from './store/account-store';
import { getContractTokens } from './store/crust-tokens-store';
import { getCurrentNetwork } from './network-service';
import { Abi, ContractPromise as Contract } from '@polkadot/api-contract';
import { getApi } from '../apis/chain';
import keyring from '@polkadot/ui-keyring';
import { Keyring } from '@polkadot/keyring';
import { BN } from 'bn.js';
import abi from './abi';
import { updateContractTokens } from './store-service';
import * as Transaction from '../../lib/constants/transaction';
import { updateTransactionState } from './transaction-service';
import { getStore } from '../store/store-provider'

let contractTokensInMem = [];

const contractAddressExisted = address => {
  const currentAccount = getCurrentAccount();
  const currentNetwork = getCurrentNetwork();
  const t = contractTokensInMem.find(token => token.address === address 
                                      && token.accountAddress === currentAccount.address
                                      && token.newrok.networkFullUrl === currentNetwork.networkFullUrl);
  return t !== undefined;
};

const validateAddress = addresses => {
  if (addresses === undefined || addresses === [] || addresses === '') {
    return {
      status: BAD_REQUEST,
      message: 'The request requires contract addresses.',
    };
  }
};

function getAddressMeta(address) {
  let meta;

  try {
    const pair = keyring.getAddress(address, 'contract');

    meta = pair && pair.meta;
  } catch (error) {
    // we could pass invalid addresses, so it may throw
    console.log('getAddressMeta', error);
  }

  return meta || {};
}

function getContractAbi(address) {
  if (!address) {
    return null;
  }

  let tempAbi;
  const meta = getAddressMeta(address);

  try {
    // const data = meta.contract ? meta.contract.abi : undefined;

    let r = getApi().registry.getChainProperties();
    tempAbi = new Abi(abi, getApi().registry.getChainProperties());
  } catch (error) {
    // invalid address, maybe
    console.log('getContractAbi:', error);
  }

  return tempAbi || null;
}

function getContractForAddress(address) {
  if (!address) {
    return null;
  } else {
    const tempAbi = getContractAbi(address);

    return tempAbi ? new Contract(getApi(), tempAbi, address) : null;
  }
}

const addContractTokenInMem = (token, contract) => {
  if (!contractAddressExisted(token.address)) {
    contractTokensInMem.push({ ...token, contract });
  }
};

const getContract = token => {
  const currentNetwork = getCurrentNetwork();
  if (token.network.networkFullUrl === currentNetwork.networkFullUrl) {
    const contract = getContractForAddress(token.address);
    const hasRpc = contract ? contract.hasRpcContractsCall : false;
    return contract;
  }

  return undefined;
};

const mergeToken = async token => {
  if (contractAddressExisted(token.address)) {
    return;
  }

  const contractTokens = getContractTokens();
  contractTokens.push(token);
  await updateContractTokens(contractTokens);
};

export const setContractTokensInMem = async network => {
  let contractTokens = getContractTokens().filter(
    token => token.network.networkFullUrl === network.networkFullUrl,
  );
  for (const token of contractTokens) {
    let ret = getContract(token);
    if (ret === undefined) {
      continue;
    }
    addContractTokenInMem(token, ret);
  }
};

export const getTokenList = async () => {
  const currentAccount = getCurrentAccount();
  const currentNetwork = getCurrentNetwork();

  if (!currentAccount || !currentNetwork) {
    return {
      status: BAD_REQUEST,
      message: 'Invalid account or network.',
    };
  }

  const allTokens = getContractTokens()
  const tokens = allTokens.filter(token => {
    return token.network.networkFullUrl === currentNetwork.networkFullUrl 
      && token.accountAddress === currentAccount.address
  });

  return tokens;
}

export const addContract = async address => {
  const vResult = validateAddress(address);
  if (vResult !== undefined) return vResult;

  
  if (contractAddressExisted(address)) {
    return {
      status: BAD_REQUEST,
      message: 'The token has existed.',
    };
  }

  const currentAccount = getCurrentAccount();

  const currentNetwork = getCurrentNetwork();

  // get contract info from chain
  const contract = getContractForAddress(address);

  if (
    !contract ||
    !contract.abi ||
    !contract.hasRpcContractsCall ||
    !contract.query.name ||
    !contract.query.symbol ||
    !contract.query.decimals ||
    !contract.query.balanceOf
  ) {
    return {
      status: BAD_REQUEST,
      message: 'Invalid token contract.',
    };
  }

  const tokenName = await contract.query.name(currentAccount.address, 0, -1);
  const tokenSymbol = await contract.query.symbol(currentAccount.address, 0, -1);
  const decimals = await contract.query.decimals(currentAccount.address, 0, -1);
  const balance = await contract.query.balanceOf(
    currentAccount.address,
    0,
    -1,
    currentAccount.address,
  );

  const token = {
    network: currentNetwork,
    accountAddress: currentAccount.address,
    address: address,
    tokenName: tokenName.output.toString(),
    tokenSymbol: tokenSymbol.output.toString(),
    decimals: decimals.output.toString(),
    balance: balance.output.toString(),
  };

  await mergeToken(token);
  addContractTokenInMem(token, contract);

  return token;
};

export const getTokenBalance = async (token) => {
  const currentAccount = getCurrentAccount();
  const contract = getContract(token);

  if (!contract) {
    throw new Error('Invalid Token');
  }
  const balance = await contract.query.balanceOf(
    currentAccount.address,
    0,
    -1,
    currentAccount.address,
  );

  return balance.output.toString();
}

export const updateTokenBalances = async () => {
  const currentAccount = getCurrentAccount();
  const currentNetwork = getCurrentNetwork();
  const allTokens = getContractTokens();

  const neededUpdatedTokens = allTokens.filter(token => token.accountAddress === currentAccount.address
                                                && token.network.networkFullUrl === currentNetwork.networkFullUrl)
  for (const token of neededUpdatedTokens) {
    if (token.address !== undefined) {
      const balance = await getTokenBalance(token);
      token.balance = balance;
    } else {
      const { balance } = await getBalance(currentAccount.address);
      token.balance = balance;
    }
  }

  return neededUpdatedTokens;
}

export const signTokenTransation = async (transaction) => {
  const {
    to,
    fAmount,
    account,
    tokenSelected,
  } = transaction.metadata;

  const { seedWords, keypairType } = getCurrentAccount();
  const kr = new Keyring({ type: keypairType });
  const accountPair = kr.addFromUri(seedWords);
  const contract = getContract(tokenSelected);

  if (!contract) {
    throw new Error('Invalid token.');
  }

  const nonce = await getApi().rpc.system.accountNextIndex(account.address);

  const signedT = await contract.tx
                    .transfer(0, -1, to, new BN(fAmount))
                    .signAsync(accountPair, { nonce })
  
  return signedT;
};

export const submitTransaction = (transactionObj, signedTransaction, txnHash) => {
  const { seedWords, keypairType } = getCurrentAccount();
  const kr = new Keyring({ type: keypairType });
  const accountPair = kr.addFromUri(seedWords);
  const contract = getContract(transactionObj.metadata.tokenSelected);

  if (!contract) {
    throw new Error('Invalid token.');
  }

  signedTransaction.send(async result => {
    if (result.status.isFinalized) {
      await updateTransactionState(transactionObj, txnHash, Transaction.SUCCESS);
    }
    if (result.status.isDropped || result.status.isInvalid || result.status.isUsurped) {
      await updateTransactionState(transactionObj, txnHash, Transaction.FAIL);
    }
  });

  const {
    transactionState: { transaction },
  } = getStore().getState();
  return transaction;
};
