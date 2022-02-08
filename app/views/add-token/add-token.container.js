import { connect } from 'react-redux';
import { addToken } from './actions';
import { changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { updateTokenList } from '../dashboard/actions';
import AddToken from './add-token.component';

const mapStateToProps = state => ({
  links: state.appStateReducer.links,
  backupPage: state.appStateReducer.backupPage,
  isConnected: state.networkReducer.isConnected,
  account: state.accountReducer.account,
  tokens: state.dashboardReducer.tokens,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  createToast,
  addToken,
  updateTokenList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToken);
