import { connect } from 'react-redux';
import Transfer from './transfer.component';
import { changePage, updateAppLoading, updateBackupPage } from '../../containers/actions';
import { updateToAddress } from '../../actions/address-book';
import {
  clearTransferDetails,
  confirmTransaction,
  resetConfirmOnBoarding,
  dispatchSetTransferDetails,
  setTransferValidationError,
  getTransferFee,
} from './actions';

const mapStateToProps = state => ({
  account: state.accountReducer.account,
  confirmDetails: state.transferReducer.confirmDetails,
  transferFee: state.transferReducer.transferFee,
  balance: state.accountReducer.balance,
  unit: state.networkReducer.unit,
  units: state.networkReducer.units,
  success: state.transferReducer.success,
  error: state.transferReducer.error,
  isToAddressError: state.transferReducer.isToAddressError,
  toAddressErrorMessage: state.transferReducer.toAddressErrorMessage,
  isAmountError: state.transferReducer.isAmountError,
  toAmountErrorMessage: state.transferReducer.toAmountErrorMessage,
  page: state.appStateReducer.page,
  backupPage: state.appStateReducer.backupPage,
  toAddress: state.addressBookReducer.toAddress,
  network: state.networkReducer.network,
  tokens: state.dashboardReducer.tokens,
  token: state.dashboardReducer.token,
  language: state.appStateReducer.language,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  clearTransferDetails,
  confirmTransaction,
  updateAppLoading,
  resetConfirmOnBoarding,
  dispatchSetTransferDetails,
  updateToAddress,
  setTransferValidationError,
  getTransferFee,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
