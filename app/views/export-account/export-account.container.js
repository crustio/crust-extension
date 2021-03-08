import { connect } from 'react-redux';
import ExportAccout from './export-account.component';
import { changePage, updateBackupPage, updateAppLoading } from '../../containers/actions';
import { createToast } from '../../constants/toast';


const mapStateToProps = state => ({
  account: state.exportAccountReducer.account,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  updateAppLoading,
  createToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportAccout);
