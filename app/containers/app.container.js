import { connect } from 'react-redux';
import App from './app.component';
import { onBoard } from '../actions/initialize';
import { switchNetwork, onToggleDeveloperMode, setNetworkMode } from '../actions/network';
import {
  changePage,
  updateAppLoading,
  fetchAndUpdateAppManifest,
  updateBackupPage,
  fetchAndUpdateLanguage,
} from './actions';
import { clearTransferDetails, resetConfirmOnBoarding } from '../views/transfer/actions';
import { createToast } from '../constants/toast';

const mapStateToProps = state => ({
  account: state.accountReducer.account,
  page: state.appStateReducer.page,
  isLoading: state.appStateReducer.isLoading || state.networkReducer.isLoadingNetwork,
  networks: state.networkReducer.networks,
  network: state.networkReducer.network,
  isConnected: state.networkReducer.isConnected,
  isOfflineMode: state.networkReducer.isOfflineMode,
  isDeveloperMode: state.networkReducer.isDeveloperMode,
  language: state.appStateReducer.language,
});

const mapDispatchToProps = {
  onBoard,
  switchNetwork,
  changePage,
  clearTransferDetails,
  updateAppLoading,
  resetConfirmOnBoarding,
  fetchAndUpdateAppManifest,
  updateBackupPage,
  onToggleDeveloperMode,
  fetchAndUpdateLanguage,
  setNetworkMode,
  createToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
