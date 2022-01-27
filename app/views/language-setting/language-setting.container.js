import { connect } from 'react-redux';
import { createToast } from '../../constants/toast';
import { updateTokenList } from '../dashboard/actions';
import LanguageSetting from './language-setting.component';
import { changePage, updateBackupPage, updateAppLanguage } from '../../containers/actions';

const mapStateToProps = state => ({
  links: state.appStateReducer.links,
  backupPage: state.appStateReducer.backupPage,
  isConnected: state.networkReducer.isConnected,
  account: state.accountReducer.account,
  tokens: state.dashboardReducer.tokens,
  language: state.appStateReducer.language,
  network: state.networkReducer.network,
});

const mapDispatchToProps = {
  changePage,
  createToast,
  updateTokenList,
  updateBackupPage,
  updateAppLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSetting);
