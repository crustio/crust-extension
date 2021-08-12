import { runtime } from 'extensionizer';
import {
  SENDER_CRUST_BG,
  SYNC_NETWORK_CONNECTED,
  SYNC_NETWORK_ERROR,
  SYNC_NETWORK_LOADING,
} from './types-for-watch-bg';
import {
  updateNetworkError,
  updateNetworkIsLoading,
  updateNetworkStatus,
} from '../actions/network';
import { updateAppLoading } from '../containers/actions';

export default function watchBg(store, utils) {
  const { dispatch } = store;
  runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // eslint-disable-next-line no-console
    console.info('msg:', msg, sender, sendResponse);
    if (msg && msg.sender === SENDER_CRUST_BG) {
      switch (msg.type) {
        case SYNC_NETWORK_CONNECTED:
          dispatch(updateNetworkStatus(msg.isConnected));
          if (msg.isConnected) {
            dispatch(updateAppLoading(true));
            utils
              .updateApplicationStateHelper(store)
              .then(() => dispatch(updateAppLoading(false)))
              .catch(() => dispatch(updateAppLoading(false)));
          }
          break;
        case SYNC_NETWORK_ERROR:
          dispatch(updateNetworkError(msg.isError, msg.isErrorByType));
          break;
        case SYNC_NETWORK_LOADING:
          dispatch(updateNetworkIsLoading(msg.isLoading));
          break;
        default:
      }
    }
  });
}
