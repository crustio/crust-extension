import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import {
  configEditAccount,
  configAliasAccount,
  connectionError,
  renameAlias,
  onTokenSelected,
} from './actions';
import { changePage, updateBackupPage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { resetToAddress } from '../../actions/address-book';
import { getUnits } from '../../actions/network';

const mapStateToProps = state => ({
  accounts: state.accountReducer.accounts,
  account: state.accountReducer.account,
  balances: state.accountReducer.balances,
  balance: state.accountReducer.balance,
  isLinkToFaucet: state.accountReducer.isLinkToFaucet,
  transactions: state.dashboardReducer.transactions,
  network: state.networkReducer.network,
  unit: state.networkReducer.unit,
  isConnected: state.networkReducer.isConnected,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
