import { connect } from 'react-redux';
import TokenDetailsPage from './token-details-page.component';
import { changePage, updateBackupPage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { resetToAddress } from '../../actions/address-book';
import { getUnits } from '../../actions/network';
import {
  configEditAccount,
  configAliasAccount,
  connectionError,
  renameAlias,
  onTokenSelected,
} from '../dashboard/actions';

const mapStateToProps = state => ({
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  page: state.appStateReducer.page,
  backupPage: state.appStateReducer.backupPage,
  isLinkToFaucet: state.accountReducer.isLinkToFaucet,
  transactions: state.dashboardReducer.transactions,
  transactionHistory: state.dashboardReducer.transactionHistory,
  network: state.networkReducer.network,
  isConnected: state.networkReducer.isConnected,
  accountMenu: state.dashboardReducer.accountMenu,
  token: state.dashboardReducer.token,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  createToast,
  configEditAccount,
  configAliasAccount,
  renameAlias,
  resetToAddress,
  getUnits,
  connectionError,
  onTokenSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenDetailsPage);
