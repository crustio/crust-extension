import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import {
  configEditAccount,
  configAliasAccount,
  connectionError,
  renameAlias,
  onTokenSelected,
  lockApp,
  fetchTransactionHistory,
} from './actions';
import { changePage, updateBackupPage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { resetToAddress } from '../../actions/address-book';
import { getUnits } from '../../actions/network';
import { addAccount } from '../manage-account/actions';

const mapStateToProps = state => ({
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  isLinkToFaucet: state.accountReducer.isLinkToFaucet,
  transactions: state.dashboardReducer.transactions,
  transactionHistory: state.dashboardReducer.transactionHistory,
  loadMore: state.dashboardReducer.loadMore,
  network: state.networkReducer.network,
  unit: state.networkReducer.unit,
  isConnected: state.networkReducer.isConnected,
  isOfflineMode: state.networkReducer.isOfflineMode,
  isError: state.networkReducer.isError,
  isErrorByType: state.networkReducer.isErrorByType,
  accountMenu: state.dashboardReducer.accountMenu,
  tokens: state.dashboardReducer.tokens,
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
  lockApp,
  addAccount,
  fetchTransactionHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
