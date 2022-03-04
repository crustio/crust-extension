/* eslint-disable import/no-extraneous-dependencies */
import { getStore } from '../store/store-provider';
import { signTransaction } from '../apis/tx';
import { updateTransactionState } from './transaction-service';
import * as Transaction from '../../lib/constants/transaction';
import { getCurrentAccount } from './store/account-store';
import { signCandyTransaction, signCSMTransaction } from './tokens-service';
import * as ChainApi from '../apis/chain';

export const transferAndWatch = async (transaction, password) => {
  const currentAccount = getCurrentAccount();
  // Fetch Transaction State
  const signedTransaction = await signTransaction(transaction, currentAccount, password);
  const txnHash = signedTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, Transaction.PENDING);

  try {
    // eslint-disable-next-line no-unused-vars
    signedTransaction.send(async result => {
      if (!result || !result.status) {
        return;
      }

      // eslint-disable-next-line
      console.log(`trans cru: status :: ${JSON.stringify(result)}`);

      const { status } = result;
      if (status.isFinalized || status.isInBlock) {
        result.events
          .filter(({ event: { section } }) => section === 'system')
          .forEach(({ event: { method } }) => {
            if (method === 'ExtrinsicFailed') {
              updateTransactionState(transaction, txnHash, Transaction.FAIL);
            } else if (method === 'ExtrinsicSuccess') {
              updateTransactionState(transaction, txnHash, Transaction.SUCCESS);
            }
          });
      } else if (result.isError || status.isDropped || status.isInvalid || status.isUsurped) {
        await updateTransactionState(transaction, txnHash, Transaction.FAIL);
      }
    });
  } catch (err) {
    // eslint-disable-next-line
    console.log('send transaction error:', err);
    updateTransactionState(transaction, txnHash, Transaction.FAIL);
  }
};

export const transferCandyAndWatch = async (transaction, password) => {
  const signedTransaction = await signCandyTransaction(transaction, password);
  const txnHash = signedTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, Transaction.PENDING);
  try {
    signedTransaction.send(async result => {
      if (!result || !result.status) {
        return;
      }

      // eslint-disable-next-line
      console.log(`trans candy: status :: ${JSON.stringify(result)}`);

      const { status } = result;
      if (status.isFinalized || status.isInBlock) {
        result.events
          .filter(({ event: { section } }) => section === 'system')
          .forEach(({ event: { method } }) => {
            if (method === 'ExtrinsicFailed') {
              updateTransactionState(transaction, txnHash, Transaction.FAIL);
            } else if (method === 'ExtrinsicSuccess') {
              updateTransactionState(transaction, txnHash, Transaction.SUCCESS);
            }
          });
      } else if (result.isError || status.isDropped || status.isInvalid || status.isUsurped) {
        await updateTransactionState(transaction, txnHash, Transaction.FAIL);
      }
    });
  } catch (err) {
    // eslint-disable-next-line
    console.log('send transaction error:', err);
    updateTransactionState(transaction, txnHash, Transaction.FAIL);
  }
};

export const transferCSMAndWatch = async (transaction, password) => {
  const signedTransaction = await signCSMTransaction(transaction, password);
  const txnHash = signedTransaction.hash.toHex();
  await updateTransactionState(transaction, txnHash, Transaction.PENDING);
  try {
    signedTransaction.send(async result => {
      if (!result || !result.status) {
        return;
      }

      // eslint-disable-next-line
      console.log(`trans candy: status :: ${JSON.stringify(result)}`);

      const { status } = result;
      if (status.isFinalized || status.isInBlock) {
        result.events
          .filter(({ event: { section } }) => section === 'system')
          .forEach(({ event: { method } }) => {
            if (method === 'ExtrinsicFailed') {
              updateTransactionState(transaction, txnHash, Transaction.FAIL);
            } else if (method === 'ExtrinsicSuccess') {
              updateTransactionState(transaction, txnHash, Transaction.SUCCESS);
            }
          });
      } else if (result.isError || status.isDropped || status.isInvalid || status.isUsurped) {
        await updateTransactionState(transaction, txnHash, Transaction.FAIL);
      }
    });
  } catch (err) {
    // eslint-disable-next-line
    console.log('send transaction error:', err);
    updateTransactionState(transaction, txnHash, Transaction.FAIL);
  }
};

export const submitTransaction = async (transactionObj, password) => {
  const { tokenSelected } = transactionObj.metadata;

  if (Transaction.TRANSFER_COINS === transactionObj.txnType) {
    if (tokenSelected.tokenSymbol === ChainApi.getTokenSymbol()) {
      await transferAndWatch(transactionObj, password);
    } else if (tokenSelected.tokenSymbol === 'Candy') {
      await transferCandyAndWatch(transactionObj, password);
    } else if (tokenSelected.tokenSymbol === 'CSM') {
      await transferCSMAndWatch(transactionObj, password);
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
