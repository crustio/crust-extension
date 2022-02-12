import { connect } from 'react-redux';
import ExportAccout from './export-account.component';
import { changePage, updateBackupPage, updateAppLoading } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { updateSelectedAccounts } from '../manage-account/actions';

const mapStateToProps = state => ({
  account: state.exportAccountReducer.account,
  accounts: state.accountReducer.accounts,
  selectedAccounts: state.manageAccountReducer.selectedAccounts,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  updateAppLoading,
  createToast,
  updateSelectedAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportAccout);
