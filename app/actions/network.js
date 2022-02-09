import * as NetworkActionTypes from '../constants/network';
import { Network } from '../api';
import * as AccountActions from './account';
import {
  DOT_NETWORK_LIST,
  DEV_DOT_NETWORK_LIST,
  DEFAULT_NETWORK,
} from '../../lib/constants/networks';
import {
  // setAppShowValidatePass,
  updateAppLoading,
} from '../containers/actions';
import { getTransactions, getTokens, fetchTransactionHistory } from '../views/dashboard/actions';
import { createFullNetworkURL } from '../../lib/services/network-validator';
import AppConfig from '../../lib/constants/config';
import { FAILURE } from '../../lib/constants/api';
import { setOfflineMode } from '../../lib/services/extension/local';

export const updateNetworkList = networks => ({
  type: NetworkActionTypes.UPDATE_NETWORK_LIST,
  networks,
});

export const changeNetwork = network => ({
  type: NetworkActionTypes.CHANGE_NETWORK,
  network,
});

export const updateCustomNetwork = customNetwork => ({
  type: NetworkActionTypes.UPDATE_CUSTOM_NETWORK,
  customNetwork,
});

export const updateNetworkStatus = isConnected => ({
  type: NetworkActionTypes.UPDATE_NETWORK_STATUS,
  isConnected,
});

export const updateNetworkError = (isError, isErrorByType) => ({
  type: NetworkActionTypes.UPDATE_NETWORK_ERROR,
  isError,
  isErrorByType,
});

export const updateNetworkIsLoading = isLoading => ({
  type: NetworkActionTypes.UPDATE_NETWORK_IS_LOADING,
  isLoading,
});

export const customNetworkValidationError = customNetworkError => ({
  type: NetworkActionTypes.CUSTOM_NETWORK_VALIDATION_ERROR,
  customNetworkError,
});

export const customNetworkValidationSuccess = customNetworkSuccess => ({
  type: NetworkActionTypes.CUSTOM_NETWORK_VALIDATION_SUCCESS,
  customNetworkSuccess,
});

export const updateDeveloperMode = isDeveloperMode => ({
  type: NetworkActionTypes.UPDATE_DEVELOPER_MODE,
  isDeveloperMode,
});

const fetchUnits = units => ({
  type: NetworkActionTypes.FETCH_UNITS,
  units,
});

const fetchUnit = unit => ({
  type: NetworkActionTypes.FETCH_UNIT,
  unit,
});
export const getUnits = () => async dispatch => {
  const { result } = await Network.getUnits();
  const unit = result.find(x => x.value === '-');
  dispatch(fetchUnit(unit));
  dispatch(fetchUnits(result));
};
export const setNetwork = async (dispatch, getState) => {
  const { isDeveloperMode } = getState().networkReducer;
  if (isDeveloperMode) {
    dispatch(
      updateNetworkList([
        ...DEV_DOT_NETWORK_LIST,
        {
          text: 'Custom...',
          value: 'custom',
        },
      ]),
    );
  } else {
    dispatch(updateNetworkList([...DOT_NETWORK_LIST]));
  }

  const { result: network } = await Network.getCurrentNetwork();
  if (network.value === 'custom') {
    dispatch(updateCustomNetwork(network));
  }
  dispatch(changeNetwork(network));
};

export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const propagateUpdates = async dispatch => {
  dispatch(updateAppLoading(true));
  dispatch(updateNetworkStatus(false));
  await dispatch(AccountActions.fetchAndSetAccounts);
  dispatch(AccountActions.setInitialBalance);
  await dispatch(AccountActions.fetchAndSetBalances);
  dispatch(getTransactions);
  dispatch(fetchTransactionHistory);
  dispatch(getUnits());
  dispatch(getTokens);
  dispatch(updateAppLoading(false));
};

export const switchNetwork = newNetwork => async (dispatch, getState) => {
  try {
    const { network, isConnected } = getState().networkReducer;
    await Network.updateCurrentNetwork(newNetwork);
    dispatch(changeNetwork(newNetwork));
    dispatch(propagateUpdates);
    dispatch(fetchTransactionHistory(newNetwork));
    if (network.value === newNetwork.value) {
      dispatch(updateNetworkStatus(!isConnected));
    }
  } catch (e) {
    dispatch();
  }
};

export const validateAndSaveURL = url => async (dispatch, getState) => {
  try {
    dispatch(updateAppLoading(true));
    const { networks } = getState().networkReducer;
    const customNetworkURLIndex = networks.findIndex(n => n.value === 'custom');
    const customNetworkObj = {
      ...networks[customNetworkURLIndex],
      ...createFullNetworkURL(url),
      url,
    };
    const { result: networkObj } = await Network.updateCurrentNetwork(customNetworkObj);
    dispatch(customNetworkValidationError(null));
    dispatch(customNetworkValidationSuccess(true));
    dispatch(changeNetwork(networkObj));
    dispatch(updateCustomNetwork(networkObj));
    dispatch(updateAppLoading(true));
    await delay(AppConfig.scheduleNetworkCheck);
    dispatch(propagateUpdates);
  } catch (e) {
    dispatch(
      customNetworkValidationError({
        customNetworkIsValid: false,
        customNetworkErrorMessage: 'Invalid URL',
      }),
    );
    dispatch(updateAppLoading(false));
  }
};

export const onToggleDeveloperMode = isDeveloperMode => async dispatch => {
  if (!isDeveloperMode) {
    // When user turn off developer mode then set to default network.
    const emptyCustomNetwork = {};
    dispatch(switchNetwork(DEFAULT_NETWORK));
    dispatch(updateCustomNetwork(emptyCustomNetwork));
  }
  await Network.updateDeveloperMode(isDeveloperMode);
  dispatch(updateDeveloperMode(isDeveloperMode));
  await dispatch(setNetwork);
};

export const getDeveloperMode = () => async dispatch => {
  const { result } = await Network.getDeveloperMode();
  dispatch(updateDeveloperMode(result));
};

export const restoreNetwork = async (dispatch, getState) => {
  const { network } = getState().networkReducer;
  const { balance } = getState().accountReducer;

  if (balance.status === FAILURE || balance.balance === '-') {
    await Network.restoreCurrentNetwork(network);
  }
};

export const doSetNetworkMode = isOfflineMode => async dispatch => {
  await setOfflineMode(isOfflineMode);
  dispatch({
    type: NetworkActionTypes.UPDATE_OFFLINE_MODE,
    isOfflineMode,
  });
  if (isOfflineMode) {
    await Network.disConnectNetwork();
  } else {
    await dispatch(restoreNetwork);
  }
};

export const setNetworkMode = isOfflineMode => async dispatch => {
  // const onSuccess = isOfflineMode
  //   ? () => doSetNetworkMode(true)(dispatch)
  //   : () => doSetNetworkMode(false)(dispatch);
  // await dispatch(setAppShowValidatePass(onSuccess));
  await doSetNetworkMode(isOfflineMode)(dispatch);
};
