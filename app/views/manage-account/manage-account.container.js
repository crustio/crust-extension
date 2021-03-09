import { connect } from 'react-redux';
import ManageAccount from './manage-account.component';
import { changePage, updateBackupPage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import {
  addAccount, changeAccount, removeAccount, resetSeedWordsBeforeImport
} from './actions';
import { updateExportingAccount } from '../export-account/actions';

const mapStateToProps = state => ({
  page: state.appStateReducer.page,
  account: state.accountReducer.account,
  accountMenu: state.dashboardReducer.accountMenu,
  accounts: state.accountReducer.accounts,
  network: state.networkReducer.network,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
