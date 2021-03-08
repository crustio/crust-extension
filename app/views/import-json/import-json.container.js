import { connect } from 'react-redux';
import ImportJson from './import-json.component';
import { changePage } from '../../containers/actions';
import { updateJsonPwdError, updateWalletPwdError, createAccountWithJson } from './actions';

const mapStateToProps = state => ({
  jsonPwdError: state.importJsonReducer.jsonPwdError,
  walletPwdError: state.importJsonReducer.walletPwdError,
});

const mapDispatchToProps = {
  changePage,
  updateJsonPwdError,
  updateWalletPwdError,
  createAccountWithJson,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportJson);
