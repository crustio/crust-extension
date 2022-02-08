import { connect } from 'react-redux';
import About from './about.component';
import { changePage, updateBackupPage } from '../../containers/actions';

const mapStateToProps = state => ({
  manifest: state.appStateReducer.manifest,
  links: state.appStateReducer.links,
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
