import { connect } from 'react-redux';
import CreateAccountEntry from './create-account-entry.component';
import { updateAppLoading, changePage, updateBackupPage } from '../../containers/actions';

const mapStateToProps = state => ({
  page: state.appStateReducer.page,
});

const mapDispatchToProps = {
  updateAppLoading,
  changePage,
  updateBackupPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountEntry);
