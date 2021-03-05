import { connect } from 'react-redux';
import CreateAccountEntry from './create-account-entry.component';
import { updateAppLoading, changePage } from '../../containers/actions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  updateAppLoading,
  changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountEntry);
