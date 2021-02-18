/* eslint-disable import/no-extraneous-dependencies */
import { getStore } from '../store/store-provider';
import { signTransaction } from '../apis/tx';
import { updateTransactionState } from './transaction-service';
import * as Transaction from '../../lib/constants/transaction';
import { getCurrentAccount } from './store/account-store';
import { getTokenList } from './tokens-service'
import * as ChainApi from '../apis/chain'
import { submitTransaction as tokenTransaction, signTokenTransation } from './contract-service'
import { signCandyTransaction, sendCandyTransaction } from './tokens-service'

export const transferAndWatch = async (seedWords, keypairType, transaction) => {
  // Fetch Transaction State
  const signedTransaction = await signTransaction(seedWords, keypairType, transaction);
  const txnHash = signedTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, Transaction.PENDING);

  // eslint-disable-next-line no-unused-vars
  signedTransaction.send(async ({ events = [], status }) => {
    if (status.isFinalized) {
      await updateTransactionState(transaction, txnHash, Transaction.SUCCESS);
    }
    if (status.isDropped || status.isInvalid || status.isUsurped) {
      await updateTransactionState(transaction, txnHash, Transaction.FAIL);
    }
  });
};

export const transferCandyAndWatch = async (transaction) => {
  const signedTransaction = await signCandyTransaction(transaction);
  const txnHash = signedTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, Transaction.PENDING);
  sendCandyTransaction(transaction, signedTransaction, txnHash);
}

export const submitTransaction = async transactionObj => {
  const { seedWords, keypairType } = getCurrentAccount();
  const { tokenSelected } = transactionObj.metadata
  const tokens = await getTokenList()

  if (Transaction.TRANSFER_COINS === transactionObj.txnType) {
    if (tokenSelected.tokenSymbol === ChainApi.getTokenSymbol()) {
      await transferAndWatch(seedWords, keypairType, transactionObj);
    } else if (tokenSelected.tokenSymbol === 'Candy') {
      await transferCandyAndWatch(transactionObj)
    } else {
      throw new Error('Check Token Type and try again');
    }
    
  } else {
    throw new Error('Check Transaction Type and try again');
  }
  const {
    transactionState: { transaction },
  } = getStore().getState();
  return transaction;
};
