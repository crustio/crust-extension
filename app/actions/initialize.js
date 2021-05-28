import * as AccountActions from './account';
import * as NavConstants from '../constants/navigation';
import * as APIConstants from '../../lib/constants/api';
import * as AppActions from '../containers/actions';
import { OnBoarding, DApp } from '../api';
import { navigateAndServiceIfDappRequest } from './dapp';
import * as RequestType from '../../lib/constants/request-types';

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
    await dispatch(AccountActions.fetchAndSetAccounts);
    const { result } = await OnBoarding.getIsAppOnBoarded();
    if (Object.prototype.hasOwnProperty.call(result, 'App') && result.App.isAppOnBoarded) {
      dispatch(navigateAndServiceIfDappRequest());
      dispatch(AppActions.updateAppLoading(false));
    } else {
      dispatch(AppActions.updateAppLoading(false));
      dispatch(AppActions.changePage(NavConstants.CREATE_ACCOUNT_PAGE));
    }
  } catch (e) {
    dispatch(AppActions.updateAppLoading(false));
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
