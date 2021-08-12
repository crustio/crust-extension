import * as AccountActions from './account';
import * as NavConstants from '../constants/navigation';
import * as APIConstants from '../../lib/constants/api';
import * as AppActions from '../containers/actions';
import { OnBoarding, DApp } from '../api';
import { navigateAndServiceIfDappRequest } from './dapp';
import * as RequestType from '../../lib/constants/request-types';
// import * as StorageService from '../../lib/services/extension/storage';
// import * as StorageKeys from '../../lib/constants/storage-keys';
import * as local from '../../lib/services/extension/local';
import { doSetNetworkMode, updateNetworkStatus } from './network';
import * as ApiNetwork from '../api/network';

let dappRequestForInit;
window.addEventListener('beforeunload', () => {
  if (dappRequestForInit) {
    DApp.cancelRequest(dappRequestForInit);
  }
});
export const clearDappRequestForInit = () => {
  dappRequestForInit = undefined;
};

export const onBoard = () => async dispatch => {
  try {
    const { result: requests } = await DApp.getDAppRequests();
    if (requests) {
      const enableRequest = requests.find(req => req.request.requestType === RequestType.ENABLE);
      if (enableRequest) {
        dappRequestForInit = enableRequest;
      }
    }
    const isOfflineMode = !!(await local.getOfflineMode());
    // eslint-disable-next-line
    console.info('isOfflineMode::', isOfflineMode);
    await dispatch(doSetNetworkMode(isOfflineMode));
    await dispatch(AccountActions.fetchAndSetAccounts);
    const { result } = await OnBoarding.getIsAppOnBoarded();
    if (Object.prototype.hasOwnProperty.call(result, 'App') && result.App.isAppOnBoarded) {
      dispatch(navigateAndServiceIfDappRequest());
      dispatch(AppActions.updateAppLoading(false));
    } else {
      dispatch(AppActions.updateAppLoading(false));
      dispatch(AppActions.changePage(NavConstants.CREATE_ACCOUNT_PAGE));
    }
    const stat = await ApiNetwork.isConnected();
    // eslint-disable-next-line
    console.info('isConnected:', stat.result.isConnected);
    await dispatch(updateNetworkStatus(stat.result.isConnected));
  } catch (e) {
    dispatch(AppActions.updateAppLoading(false));
    // eslint-disable-next-line
    console.info('eee:', e);
    switch (e.code) {
      case APIConstants.UNAUTHORIZED:
        dispatch(AppActions.changePage(NavConstants.SIGN_IN_PAGE));
        break;
      case APIConstants.BAD_REQUEST:
        dispatch(AppActions.changePage(NavConstants.SIGN_UP_PAGE));
        break;
      default:
        dispatch(AppActions.changePage(NavConstants.ERROR_PAGE));
    }
  }
};
