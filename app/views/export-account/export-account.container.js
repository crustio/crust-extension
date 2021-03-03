import { connect } from 'react-redux';
import ExportAccout from './export-account.component';
import { changePage } from '../../containers/actions';
import { unlockCrust } from '../sign-in/actions';

const mapStateToProps = state => ({
  address: state.exportAccountReducer.address,
  error: state.unlockCrustReducer.error,
  success: state.unlockCrustReducer.success,
});

const mapDispatchToProps = {
  changePage,
  unlockCrust,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportAccout);
