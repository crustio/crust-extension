import BN from 'bn.js';
import { bnToBn, formatNumber } from '@polkadot/util';
import { createType, TypeRegistry } from '@polkadot/types';
import { Metadata } from '@polkadot/metadata';
import { base64Decode } from '@polkadot/util-crypto';
import { typesBundleForPolkadot } from '@crustio/type-definitions';
import keyring from '@polkadot/ui-keyring';
import {
  getFeesByPaymentInfo,
  getTokenBalance,
  getTxnError,
  isValidTokenAmount,
  updateTransactionState,
} from './transaction-service';
import * as TXAPI from '../apis/tx';
import * as Chain from '../apis/chain';
import { valueFormatter } from './balance-service';
import { findChain } from './store-service';
import * as Transaction from '../../lib/constants/transaction';
import { validateDappTxnObject } from '../../lib/services/validation-service';
import { getAccount } from './account-service';
import * as NetworkService from './network-service';
import { convertBalanceToShow } from '../../lib/services/numberFormatter';

export const PERIOD = 10;

const expandChain = chain => {
  let registry = null;
  if (chain.name === Chain.getNetworkValue() && Chain.getApi()) {
    registry = Chain.getRegistry();
  } else {
    registry = new TypeRegistry();
    const {
      ss58Format, tokenDecimals, tokenSymbol, metaCalls, types
    } = chain;
    registry.setChainProperties(registry.createType('ChainProperties'), {
      ss58Format,
      tokenDecimals,
      tokenSymbol,
    });
    if (metaCalls) {
      const metadata = new Metadata(registry, base64Decode(metaCalls));
      const signedExtensions = metadata.asLatest.extrinsic.signedExtensions.toJSON();
      registry.setMetadata(metadata, signedExtensions);
    }
    if (Object.keys(types).length > 0) {
      registry.register(types);
      registry.setKnownTypes({
        types,
        typesBundle: typesBundleForPolkadot,
      });
    }
  }
  return {
    ...chain,
    registry,
  };
};

const decodeMethod = async (data, specVersion, chain) => {
  let json = null;
  let method = {};

  try {
    // if (specVersion === chain.specVersion) {
    method = chain.registry.createType('Call', data);
    json = method.toJSON();
    // }
  } catch (error) {
    json = null;
  }

  return {
    json,
    method,
  };
};
const getPayload = (request, chain) => {
  const { registry } = chain;
  return createType(registry, 'ExtrinsicPayload', request, {
    version: request.version,
  });
};

const mortalityAsString = async (exERA, hexBlockNumber) => {
  try {
    if (exERA.isImmortalEra) {
      return 'immortal';
    }
    const blockNumber = bnToBn(hexBlockNumber);
    const mortal = exERA.asMortalEra;
    return `mortal, valid from #${formatNumber(mortal.birth(blockNumber))} to #${formatNumber(
      mortal.death(blockNumber),
    )}`;
  } catch (err) {
    return 'working on mortality';
  }
};

const createOfflineTxnUIObject = async txnPayload => {
  const {
    address, blockHash, genesisHash, method, specVersion
  } = txnPayload;
  const chain = findChain(genesisHash);
  const sVersion = bnToBn(specVersion).toNumber();
  return {
    address,
    blockHash,
    chain: chain.name,
    sVersion,
    method,
    dest: '',
    value: new BN('0'),
    fValue: '',
    items: [
      {
        method: 'unknown',
        section: 'unknown',
        args: [method],
      },
    ],
  };
};

const createTxnUIObject = async txnPayload => {
  try {
    const {
      address, blockHash, blockNumber, genesisHash, method, specVersion
    } = txnPayload;
    const chain = expandChain(findChain(genesisHash));
    const payload = getPayload(txnPayload, chain);
    const { era, nonce, tip } = payload;

    const sVersion = bnToBn(specVersion).toNumber();
    // const mortality = await mortalityAsString(era, blockNumber);
    const decodedMethod = await decodeMethod(method, sVersion, chain);
    const {
      method: { args, section: sectionName, method: methodName },
      json,
    } = decodedMethod;
    //
    // const mArgs = args[0].toHuman()
    // console.info('decodeMethod:', mArgs, decodedMethod);
    // const note = meta.documentation.map(doc => doc.toString()).join(' ');

    const isMulti = Array.isArray(args[0]) && (methodName === 'batch' || methodName === 'batchAll');
    const mArgs = isMulti ? args[0] : decodedMethod.method;
    const items = [];
    let fToAddress = '';
    let inputValue = '0';
    let fValue = '';
    if (isMulti) {
      for (let index = 0; index < mArgs.length; index++) {
        const item = mArgs[index];
        let itemArgs = [];
        if (item.method === 'transfer' || item.method === 'transferKeepAlive') {
          const tempArgs = item.args.map(i => i.toString());
          inputValue = tempArgs[0];
          itemArgs = [tempArgs[0], `${convertBalanceToShow(tempArgs[1], 12, 4)} CRU`];
          fValue = itemArgs[1];
        } else {
          itemArgs = item.toHuman().args;
        }
        items.push({
          section: item.section || 'unknown',
          method: item.method || 'unknown',
          args: itemArgs || [],
        });
      }
    } else {
      let itemArgs = [];
      if (mArgs.method === 'transfer' || mArgs.method === 'transferKeepAlive') {
        const {
          dest, value, target, amount
        } = json.args;
        const toAddress = sectionName === 'candy' ? target : dest;
        fToAddress = keyring.encodeAddress(toAddress, chain.ss58Format);
        inputValue = sectionName === 'candy' ? bnToBn(amount) : bnToBn(value);
        const symbol = sectionName === 'candy' ? 'Candy' : sectionName === 'csm' ? 'CSM' : 'CRU';
        itemArgs = [fToAddress, `${convertBalanceToShow(inputValue, 12, 4)} ${symbol}`];
        fValue = itemArgs[1];
      } else {
        itemArgs = mArgs.toHuman().args;
      }
      items.push({
        section: mArgs.section || 'unknown',
        method: mArgs.method || 'unknown',
        args: itemArgs || [],
      });
    }
    console.info('items->', mArgs.toHuman(), items);

    return {
      address,
      blockHash,
      chain: chain.name,
      sVersion,
      // mortality,
      sectionName,
      method: `${sectionName}.${methodName}`,
      nonce: formatNumber(nonce),
      tip: formatNumber(tip),
      fValue,
      dest: fToAddress,
      value: inputValue,
      items,
      // note,
    };
  } catch (e) {
    console.error(e);
    return await createOfflineTxnUIObject(txnPayload);
  }
};

export const setNetwork = async txnPayload => {
  const { genesisHash } = txnPayload;
  const chain = findChain(genesisHash);
  if (!chain) {
    throw new Error('not support network');
  }
  const network = NetworkService.getNetworkByName(chain.name);
  await NetworkService.updateCurrentNetwork(network);
  return network;
};

export const checkSetNetwork = async (txnPayload, needSet) => {
  const { genesisHash } = txnPayload;
  const chain = findChain(genesisHash);
  if (!chain) {
    throw new Error('not support network');
  }
  const network = NetworkService.getNetworkByName(chain.name);
  let currentNet = NetworkService.getCurrentNetwork();
  if (network.value !== currentNet.value) {
    if (needSet) {
      await NetworkService.updateCurrentNetwork(network);
      currentNet = NetworkService.getCurrentNetwork();
    } else {
      throw new Error('network not match');
    }
  }
  return currentNet;
};

export const validateDappTransaction = async transaction => {
  // validate transaction object

  const vTransaction = validateDappTxnObject(transaction);

  if (vTransaction !== undefined) return vTransaction;

  const txnError = getTxnError();
  const { url, txnPayload, network } = transaction;

  // creating txnForUI object
  const txnForUI = await createTxnUIObject(txnPayload);
  const {
    address, value, dest, sectionName
  } = txnForUI;

  // get Txn Fees.
  // const transactionLength = Transaction.SIGNATURE_SIZE;
  const txnType = Transaction.TRANSFER_COINS;
  const tokenSelected = {
    tokenSymbol: sectionName === 'candy' ? 'Candy' : 'CRU',
  };
  const fees = await getFeesByPaymentInfo(txnType, address, dest, new BN(value), tokenSelected); // in femto
  const balance = await getTokenBalance(address, tokenSelected); // in femto
  const { totalFee } = fees;
  const totalAmount = new BN(value).add(new BN(fees.totalFee));
  // get current balance
  const balanceInBN = new BN(balance);

  const newTransaction = {
    txnForUI: {
      ...txnForUI,
      url,
      transferFee: valueFormatter(fees.totalFee),
      transferAmount: valueFormatter(value),
      totalTransferAmount: valueFormatter(totalAmount),
    },
    txnPayload,
  };

  // check for sufficient balance
  const isValidAmount = await isValidTokenAmount(
    balanceInBN,
    totalAmount,
    network,
    new BN(value),
    new BN(totalFee),
    tokenSelected,
    address,
  );
  if (!isValidAmount) {
    txnError.isError = true;
    txnError.isAmountError = true;
    txnError.toAmountErrorMessage = 'Insufficient Balance';
  }
  return {
    ...newTransaction,
    ...txnError,
  };
};

export const offlineValidateDappTransaction = async transaction => {
  // validate transaction object

  const vTransaction = validateDappTxnObject(transaction);

  if (vTransaction !== undefined) return vTransaction;

  const txnError = getTxnError();
  const { url, txnPayload } = transaction;

  // creating txnForUI object
  const txnForUI = await createTxnUIObject(txnPayload);
  const { value } = txnForUI;
  const fees = { totalFee: '0' }; // in femto
  const totalAmount = new BN(value).add(new BN(fees.totalFee));
  // get current balance

  const newTransaction = {
    txnForUI: {
      ...txnForUI,
      url,
      transferFee: valueFormatter(fees.totalFee),
      transferAmount: valueFormatter(value),
      totalTransferAmount: valueFormatter(totalAmount),
    },
    txnPayload,
  };
  return {
    ...newTransaction,
    ...txnError,
  };
};

export const signTransaction = async (txnPayload, password) => {
  // For storing txn in TXN_LIST
  const txnForUI = await createTxnUIObject(txnPayload);
  const {
    address, value, fValue, dest
  } = txnForUI;
  const account = getAccount(address);
  const network = NetworkService.getCurrentNetwork();
  const metadata = {
    to: dest,
    fAmount: value,
    account: { address },
    transferAmount: fValue,
  };
  const transaction = {
    metadata,
    internal: {
      address,
      network,
    },
    txnType: Transaction.TRANSFER_COINS,
  };

  // create signature for Dapp
  const signature = await TXAPI.getSignature(account, txnPayload, password);

  // Fetch Transaction State
  const txnHash = '';
  await updateTransactionState(transaction, txnHash, Transaction.DAPP);
  return signature;
};
