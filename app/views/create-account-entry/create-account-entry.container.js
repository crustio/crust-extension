import { connect } from 'react-redux';
import CreateAccountEntry from './create-account-entry.component';
import { updateAppLoading, changePage, updateBackupPage } from '../../containers/actions';
import { addAccount, resetSeedWordsBeforeImport } from '../manage-account/actions';

const mapStateToProps = state => ({
  page: state.appStateReducer.page,
  isLoading: state.appStateReducer.isLoading || state.networkReducer.isLoadingNetwork,
});

const mapDispatchToProps = {
  updateAppLoading,
  changePage,
  updateBackupPage,
  addAccount,
  resetSeedWordsBeforeImport,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountEntry);
