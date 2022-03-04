import * as TransferActionTypes from './action-types';
import { Transaction } from '../../api';
import { TRANSFER_COINS } from '../../../lib/constants/transaction';
import { updateAppLoading } from '../../containers/actions';
import { isConnected } from '../../api/network';
import { promiseTimeout } from '../../utils/helper';

export const dispatchSetTransferDetails = confirmDetails => ({
  type: TransferActionTypes.COIN_TRANSFER_DETAILS,
  confirmDetails,
});

export const clearTransferDetails = () => ({
  type: TransferActionTypes.CLEAR_COIN_TRANSFER_DETAILS,
});

const confirmTransactionSuccess = success => ({
  type: TransferActionTypes.CONFIRM_TRANSFER_SUCCESS,
  success,
});

const confirmTransactionError = error => ({
  type: TransferActionTypes.CONFIRM_TRANSFER_ERROR,
  error,
});

const dispatchSetTransferFee = transferFee => ({
  type: TransferActionTypes.SET_TRANSFER_FEE,
  transferFee,
});

export const setTransferValidationError = error => ({
  type: TransferActionTypes.SET_TRANSFER_VALIDATION_ERROR,
  error,
});

export const confirmTransaction = (
  to,
  account,
  amount,
  unit,
  tokenSelected,
  network,
) => async dispatch => {
  try {
    // eslint-disable-next-line
    console.log('confirmTransaction:1', to);
    dispatch(updateAppLoading(true));
    let ret;
    let n = 0;
    // eslint-disable-next-line
    while (true) {
      n += 1;
      // eslint-disable-next-line
      ret = await promiseTimeout(1000, isConnected(network), { isConnected: false });
      if (ret.result.isConnected) {
        break;
      }

      if (n > 10) {
        throw new Error('Time out');
      }
    }
    // eslint-disable-next-line
    console.log('confirmTransaction:2', tokenSelected);
    const { result: transaction } = await Transaction.confirmTransaction({
      txnType: TRANSFER_COINS,
      to,
      account,
      amount,
      unit,
      tokenSelected,
    });
    // eslint-disable-next-line
    console.log('confirmTransaction:3', transaction);
    if (transaction.isError) {
      dispatch(updateAppLoading(false));
      dispatch(setTransferValidationError(transaction));
      dispatch(confirmTransactionError(transaction));
    } else {
      dispatch(setTransferValidationError(null));
      dispatch(confirmTransactionError(null));
      dispatch(dispatchSetTransferDetails(transaction));
      dispatch(confirmTransactionSuccess(true));
    }
  } catch (e) {
    dispatch(updateAppLoading(false));
    dispatch(confirmTransactionError(e));
  }
};

export const resetConfirmOnBoarding = () => async dispatch => {
  dispatch(confirmTransactionSuccess(false));
  dispatch(setTransferValidationError(null));
  dispatch(confirmTransactionError(null));
};

export const getTransferFee = (
  to,
  account,
  amount,
  unit,
  tokenSelected,
  network,
) => async dispatch => {
  dispatch(updateAppLoading(true));
  const { result } = await Transaction.getTransactionFee({
    txnType: TRANSFER_COINS,
    to,
    account,
    amount,
    unit,
    tokenSelected,
  });

  dispatch(dispatchSetTransferFee(result.totalFee));
  dispatch(updateAppLoading(false));
};
