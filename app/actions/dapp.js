import * as RequestType from '../../lib/constants/request-types';
import * as AppActions from '../containers/actions';
import * as AccountActions from './account';
import { getTransactions, getTokens, fetchTransactionHistory } from '../views/dashboard/actions';
import {
  setNetwork, getUnits, getDeveloperMode, restoreNetwork
} from './network';
import * as NavConstants from '../constants/navigation';
import * as dAppActionType from '../constants/dapp';
import { DApp } from '../api';
import { promiseTimeout } from '../utils/helper';

export const setEnableRequest = request => ({
  type: dAppActionType.CONNECT_REQUEST_ENABLE_REQUEST,
  request,
});

export const setDAppRequests = requests => ({
  type: dAppActionType.DAPP_REQUESTS_SET,
  requests,
});

const openDashboard = () => async dispatch => {
  await dispatch(getDeveloperMode());
  await dispatch(setNetwork);
  dispatch(AccountActions.setInitialBalance);
  await promiseTimeout(3000, dispatch(AccountActions.fetchAndSetBalances), {});
  try {
    await promiseTimeout(5000, dispatch(restoreNetwork), {});
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }

  await dispatch(getTransactions);
  await dispatch(fetchTransactionHistory);
  dispatch(getUnits());
  await promiseTimeout(3000, dispatch(getTokens), {});
  dispatch(AppActions.updateIsAppOnBoarded(true));
  dispatch(AppActions.updateAppLoading(false));
  dispatch(AppActions.changePage(NavConstants.DASHBOARD_PAGE));
};

export const navigateAndServiceIfDappRequest = () => async dispatch => {
  try {
    const { result: requests } = await DApp.getDAppRequests();
    if (requests) {
      const enableRequest = requests.find(
        req => req.request.requestType === RequestType.ENABLE
          || req.request.requestType === RequestType.CHANGE_ACCOUNT,
      );
      if (enableRequest) {
        dispatch(setEnableRequest(enableRequest));
        dispatch(AppActions.changePage(NavConstants.CONNECT_REQUEST_PAGE));
      } else {
        dispatch(setDAppRequests(requests));
        dispatch(AppActions.changePage(NavConstants.DAPP_REQUESTS_PAGE));
      }
    } else {
      dispatch(openDashboard());
    }
  } catch (e) {
    dispatch(openDashboard());
  }
};
