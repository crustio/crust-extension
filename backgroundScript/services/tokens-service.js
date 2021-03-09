import keyring from '@polkadot/ui-keyring';
import { BAD_REQUEST } from '../../lib/constants/api';
import { getCurrentAccount } from './store/account-store';
import { getCurrentNetwork } from './network-service';
import { getApi, getTokenDecimals } from '../apis/chain';
import { Keyring } from '@polkadot/keyring';
import { BN } from 'bn.js';
import { getStore } from '../store/store-provider';
import { updateTransactionState } from './transaction-service';
import * as Transaction from '../../lib/constants/transaction';

const candyTemplate = {
  network: null,
  accountAddress: null,
  tokenName: 'Candy',
  tokenSymbol: 'Candy',
  decimals: '15',
  balance: '0',
};

export const getCandyToken = async () => {
  const currentAccount = getCurrentAccount();
  const currentNetwork = getCurrentNetwork();

  if (!currentAccount || !currentNetwork) {
    return {
      status: BAD_REQUEST,
      message: 'Invalid account or network.',
    };
  }

  const token = { ...candyTemplate }
  token.network = currentNetwork;
  token.accountAddress = currentAccount.address;
  token.decimals = getTokenDecimals().toString();

  const balance = await getApi().query.candy.balances(currentAccount.address)
  token.balance = balance.toString();

  return token;
}

export const getTokenList = async () => {
  const token = await getCandyToken();

  return [token];
}

export const getCandyBalance = async () => {
  const token = await getCandyToken();
  return token.balance;
}

export const signCandyTransaction = async (transaction, password) => {
  const {
    to,
    fAmount,
  } = transaction.metadata;

  const currentAccount = getCurrentAccount();
  const accountPair = keyring.getPair(currentAccount.address);

  accountPair.decodePkcs8(password);

  const nonce = await getApi().rpc.system.accountNextIndex(currentAccount.address);
  const signedT = await getApi().tx.candy
                    .transfer(to, new BN(fAmount))
                    .signAsync(accountPair, { nonce })
  
  return signedT;
}

export const sendCandyTransaction = async (transactionObj, signedTransaction, txnHash) => {
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
}

