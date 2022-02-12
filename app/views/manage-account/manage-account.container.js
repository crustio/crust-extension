import { connect } from 'react-redux';
import ManageAccount from './manage-account.component';
import { changePage, updateBackupPage, updateAppLoading } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import {
  addAccount,
  changeAccount,
  removeAccount,
  resetSeedWordsBeforeImport,
  updateCurrentTab,
  updateSelectedAccounts,
} from './actions';
import { updateExportingAccount } from '../export-account/actions';
import { setNetworkMode } from '../../actions/network';
import { lockApp } from '../dashboard/actions';

const mapStateToProps = state => ({
  page: state.appStateReducer.page,
  account: state.accountReducer.account,
  accountMenu: state.dashboardReducer.accountMenu,
  accounts: state.accountReducer.accounts,
  network: state.networkReducer.network,
  language: state.appStateReducer.language,
  isOfflineMode: state.networkReducer.isOfflineMode,
  currentTab: state.manageAccountReducer.currentTab,
  selectedAccounts: state.manageAccountReducer.selectedAccounts,
});

const mapDispatchToProps = {
  changePage,
  createToast,
  addAccount,
  resetSeedWordsBeforeImport,
  changeAccount,
  removeAccount,
  updateExportingAccount,
  updateBackupPage,
  setNetworkMode,
  lockApp,
  updateCurrentTab,
  updateAppLoading,
  updateSelectedAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
