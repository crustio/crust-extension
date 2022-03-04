import { changePage, updateAppLoading } from '../../containers/actions';
import { clearTransferDetails } from '../transfer/actions';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import { createToast } from '../../constants/toast';
import { Transaction, Account } from '../../api';
import { getTransactions, fetchTransactionHistory } from '../dashboard/actions';

export const submitTransaction = (confirmDetails, password) => async dispatch => {
  try {
    dispatch(updateAppLoading(true));
    await Account.verifyPassword(password);
    const { result } = await Transaction.submitTransaction(confirmDetails, password);

    dispatch(getTransactions);
    dispatch(fetchTransactionHistory);
    dispatch(changePage(DASHBOARD_PAGE));
    dispatch(clearTransferDetails());
    dispatch(updateAppLoading(false));
    return result;
  } catch (e) {
    if (e.message === 'Password is incorrect.') {
      dispatch(updateAppLoading(false));
      return e.message;
    }
    dispatch(
      createToast({
        message: 'Error submitting transaction',
        type: 'error',
      }),
    );
  }
  dispatch(changePage(DASHBOARD_PAGE));
  dispatch(clearTransferDetails());
  dispatch(updateAppLoading(false));
};

export const isNewAddress = address => async dispatch => {
  try {
    const { result } = await Transaction.isNewAddress(address);
    return result;
  } catch (e) {
    dispatch(
      createToast({
        message: 'Error submitting transaction',
        type: 'error',
      }),
    );
  }
};
