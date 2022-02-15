import { connect } from 'react-redux';
import SignIn from './sign-in.component';
import { unlockCrust } from './actions';
import { onBoard } from '../../actions/initialize';

const mapStateToProps = state => ({
  error: state.unlockCrustReducer.error,
  success: state.unlockCrustReducer.success,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  unlockCrust,
  onBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
