/* eslint-disable no-unused-vars */
import moment from 'moment';
import BN from 'bn.js';
import * as Transaction from '../../lib/constants/transaction';
import * as FeeService from './fee-service';
import { getStore } from '../store/store-provider';
import * as transactionActions from '../actions/transactions';
import { updateTransactionsState } from './store-service';
import * as Notification from '../../lib/services/extension/notifications';
import { createTransactionToastMessage } from '../../lib/services/static-message-factory-service';
import { convertShowToBalance } from './unit-converter';
import { getBaseUnit } from '../apis/chain';
import {
  KUSAMA_NETWORK,
  WESTEND_NETWORK,
  EDGEWARE_NETWORK,
  BERESHEET_NETWORK,
} from '../../lib/constants/networks';
import { getTxnEncodedLength } from '../apis/tx';
import { getBalance, valueFormatter } from './balance-service';
import { isValidAddress } from './account-service';
import { validateTxnObject } from '../../lib/services/validation-service';
import { convertBalanceToShow } from '../../lib/services/numberFormatter';
import * as ChainApi from '../apis/chain';
import { getCandyToken, getCSMToken } from './tokens-service';
import { FAILURE } from '../../lib/constants/api';

const extension = require('extensionizer');

//  update transaction State
const updateTransaction = async transaction => {
  getStore().dispatch(transactionActions.fetchTransaction(transaction));
};

const updateTransactionObj = (transaction, txnHash, txnStatus) => ({
  ...transaction,
  status: txnStatus,
  date: moment().format(),
  txnHash,
});

export const getTxnError = () => ({
  isError: false,
  isToAddressError: false,
  toAddressErrorMessage: null,
  isAmountError: false,
  toAmountErrorMessage: null,
});

export const isValidTxnAmount = (balance, totalAmount, network) => {
  if (
    network.value === KUSAMA_NETWORK.value
    || network.value === EDGEWARE_NETWORK.value
    || network.value === BERESHEET_NETWORK.value
  ) {
    return balance.gt(new BN(Transaction.KUSAMA_MINIMUM_BALANCE)) && balance.gte(totalAmount);
  }
  if (network.value === WESTEND_NETWORK.value) {
    return balance.gt(new BN(Transaction.MINIMUM_BALANCE)) && balance.gt(totalAmount);
  }
  return balance.gt(totalAmount);
};
export const mergeTransactions = async newTransaction => {
  const { transactionArr } = getStore().getState().transactionState;
  // remove Pending duplicate TXN and overide with new Status
  const pendingTransactionIndex = transactionArr.findIndex(
    x => x.txnHash && x.txnHash === newTransaction.txnHash,
  );
  if (pendingTransactionIndex > -1) {
    transactionArr.splice(pendingTransactionIndex, 1, newTransaction);
  } else {
    transactionArr.push(newTransaction);
  }
  return transactionArr;
};

// filter transactions
export const filterTransactions = async (transactions, network, address) => {
  let newTransactions = [];
  if (network !== undefined) {
    newTransactions = transactions.filter(tx => tx.internal.network.value === network.value);
  }
  if (address !== undefined) {
    newTransactions = newTransactions.filter(tx => tx.internal.address === address);
  }
  return newTransactions;
};

export const sendOSNotification = async transaction => {
  const { message } = createTransactionToastMessage(transaction);
  const txnDetailURl = `${transaction.internal.network.transactionUrl}/${transaction.txnHash}`;
  await Notification.createNotification('CRUST', message, txnDetailURl);
};

export const updateTransactionState = async (transaction, txnHash, txnStatus) => {
  const newTransaction = updateTransactionObj(transaction, txnHash, txnStatus);
  const newTransactionArr = await mergeTransactions(newTransaction);
  if (txnStatus === Transaction.PENDING) {
    await updateTransaction(newTransaction);
  } else {
    await updateTransaction(undefined);
    const views = extension.extension.getViews({ type: 'popup' });
    if (views.length === 0) {
      await sendOSNotification(newTransaction);
    }
  }
  await updateTransactionsState(newTransactionArr);
};

const createTransactionObj = transaction => {
  const {
    to,
    account,
    amount,
    unit,
    fAmount,
    fees,
    totalAmount,
    network,
    tokenSelected,
  } = transaction;

  const feeStr = convertBalanceToShow(fees.totalFee, ChainApi.getTokenDecimals(), ChainApi.getTokenDecimals())
    + ChainApi.getTokenSymbol();
  const amountStr = convertBalanceToShow(fAmount, tokenSelected.decimals, tokenSelected.decimals)
    + tokenSelected.tokenSymbol;

  let total = convertBalanceToShow(totalAmount.toString(), tokenSelected.decimals, tokenSelected.decimals)
    + tokenSelected.tokenSymbol;
  if (ChainApi.getTokenSymbol() !== tokenSelected.tokenSymbol) {
    total = `${amountStr} + ${feeStr}`;
  }

  const newTransactionObject = {
    txnType: Transaction.TRANSFER_COINS,
    metadata: {
      account,
      to,
      amount,
      unit,
      fAmount,
      fees,
      transferFee: feeStr,
      transferAmount: amountStr,
      totalTransferAmount: total,
      tokenSelected,
    },
    internal: { address: account.address, network },
  };
  return newTransactionObject;
};

export const getBalanceWithThrow = async senderAddress => {
  const balance = await getBalance(senderAddress);
  if (balance.status === FAILURE) {
    throw new Error('Failed to get balance.');
  }
  return balance.balance;
};

export const getCandyBalanceWithThrow = async token => {
  const candyToken = await getCandyToken(token);

  if (candyToken.status === FAILURE) {
    throw new Error('Failed to get candy balance.');
  }

  return candyToken.balance;
};

export const getCsmBalanceWithThrow = async token => {
  const csmToken = await getCSMToken(token);

  if (csmToken.status === FAILURE) {
    throw new Error('Failed to get candy balance.');
  }

  return csmToken.balance;
};

export const getTokenBalance = async (senderAddress, token) => {
  if (token.tokenSymbol === ChainApi.getTokenSymbol()) {
    const balance = await getBalanceWithThrow(senderAddress);
    return balance;
  }
  if (token.tokenSymbol === 'Candy') {
    const balance = await getCandyBalanceWithThrow(token);
    return balance;
  }
  if (token.tokenSymbol === 'CSM') {
    const balance = await getCsmBalanceWithThrow(token);
    return balance;
  }
};

export const isValidTokenAmount = async (
  balanceInBN,
  totalAmount,
  network,
  famountInBN,
  feeInBN,
  token,
  senderAddress,
) => {
  if (token.tokenSymbol === ChainApi.getTokenSymbol()) {
    return isValidTxnAmount(balanceInBN, totalAmount, network);
  }
  if (token.tokenSymbol === 'Candy' || token.tokenSymbol === 'CSM') {
    const balance = await getBalanceWithThrow(senderAddress);
    const defaultBalance = new BN(balance);
    return balanceInBN.gte(famountInBN) && defaultBalance.gte(feeInBN);
  }
  throw new Error('Invalid Token Type');
};

export const getFeesByPaymentInfo = async (
  txnType,
  senderAddress,
  toAddress,
  amountInBn,
  tokenSelected,
) => {
  switch (txnType) {
    case Transaction.TRANSFER_COINS: {
      if (
        tokenSelected.tokenSymbol === ChainApi.getTokenSymbol()
        || tokenSelected.tokenSymbol === 'Candy'
        || tokenSelected.tokenSymbol === 'CSM'
      ) {
        const fees = FeeService.getTrasactionFees(
          senderAddress,
          toAddress,
          amountInBn,
          tokenSelected,
        );
        return fees;
      }
      throw new Error('Invalid Token Type');
    }
    default:
      throw new Error('Invalid Transaction Type');
  }
};

const validateAmount = async (senderAddress, network, transaction, seedWords, keypairType) => {
  const {
    to, account, amount, unit, txnType, tokenSelected
  } = transaction;
  // const fAmount = convertUnit(amount.toString(), unit.text, getBaseUnit().text); // converting in femto
  const fAmount = convertShowToBalance(amount.toString(), tokenSelected);
  // TODO MM: Take 0 Signature size to show 10 milli fees like polkadot
  // const transactionLength = await getTxnEncodedLength(to, fAmount, seedWords, keypairType);
  const transactionLength = Transaction.SIGNATURE_SIZE;
  const fees = await getFeesByPaymentInfo(
    txnType,
    senderAddress,
    to,
    new BN(fAmount),
    tokenSelected,
  ); // in femto
  const balance = await getTokenBalance(senderAddress, tokenSelected); // in femto
  const { totalFee } = fees;
  const totalAmount = new BN(fAmount).add(new BN(totalFee));
  const balanceInBN = new BN(balance);
  const isValidAmount = await isValidTokenAmount(
    balanceInBN,
    totalAmount,
    network,
    new BN(fAmount),
    new BN(totalFee),
    tokenSelected,
    senderAddress,
  );
  if (isValidAmount) {
    return {
      to,
      account,
      unit,
      amount,
      fAmount,
      fees,
      totalAmount,
      network,
      isValidAmount,
      tokenSelected,
    };
  }
  return { isValidAmount };
};
export const confirmTransaction = async (
  senderAddress,
  network,
  transaction,
  seedWords,
  keypairType,
) => {
  // validate transaction object
  let newTransaction;
  const vTransaction = validateTxnObject(transaction);
  if (vTransaction !== undefined) return vTransaction;

  const txnError = getTxnError();

  if (isValidAddress(transaction.to)) {
    // validate amount
    newTransaction = await validateAmount(
      senderAddress,
      network,
      transaction,
      seedWords,
      keypairType,
    );
    const { isValidAmount } = newTransaction;
    if (isValidAmount) {
      newTransaction = createTransactionObj(newTransaction);
    } else {
      txnError.isError = true;
      txnError.isAmountError = true;
      txnError.toAmountErrorMessage = 'Insufficient Balance';
    }
  } else {
    txnError.isError = true;
    txnError.isToAddressError = true;
    txnError.toAddressErrorMessage = 'Invalid Address';
  }
  return { ...newTransaction, ...txnError };
};

export const getTransactionFees = async (
  senderAddress,
  network,
  transaction,
  seedWords,
  keypairType,
) => {
  const vTransaction = validateTxnObject(transaction);
  if (vTransaction !== undefined) return vTransaction;

  let fees;
  const txnError = getTxnError();
  const {
    to, account, amount, unit, txnType, tokenSelected
  } = transaction;
  const fAmount = convertShowToBalance(amount.toString(), tokenSelected);
  if (isValidAddress(transaction.to)) {
    fees = await getFeesByPaymentInfo(txnType, senderAddress, to, new BN(fAmount), tokenSelected);
  } else {
    txnError.isError = true;
    txnError.isToAddressError = true;
    txnError.toAddressErrorMessage = 'Invalid Address';
  }

  return { ...fees, ...txnError };
};
