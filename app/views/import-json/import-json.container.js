import { connect } from 'react-redux';
import ImportJson from './import-json.component';
import { changePage, updateBackupPage } from '../../containers/actions';
import { updateJsonPwdError, updateWalletPwdError, createAccountWithJson } from './actions';

const mapStateToProps = state => ({
  jsonPwdError: state.importJsonReducer.jsonPwdError,
  walletPwdError: state.importJsonReducer.walletPwdError,
  backupPage: state.appStateReducer.backupPage,
  language: state.appStateReducer.language,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  updateJsonPwdError,
  updateWalletPwdError,
  createAccountWithJson,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportJson);
