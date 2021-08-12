import * as Types from '../constants/network';
import { DEFAULT_NETWORK } from '../../lib/constants/networks';

const initialState = {
  networks: [],
  network: DEFAULT_NETWORK,
  customNetwork: {},
  isConnected: false,
  isLoadingNetwork: false,
  isOfflineMode: false,
  isError: false,
  isErrorByType: false,
  isDeveloperMode: false,
  customNetworkSuccess: false,
  customNetworkError: {
    customNetworkIsValid: true,
    customNetworkErrorMessage: null,
  },
  units: undefined,
  unit: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_NETWORK_LIST:
      return {
        ...state,
        ...{
          networks: action.networks,
        },
      };
    case Types.CHANGE_NETWORK:
      return {
        ...state,
        ...{
          network: action.network,
        },
      };
    case Types.FETCH_UNITS:
      return {
        ...state,
        ...{
          units: action.units,
        },
      };
    case Types.FETCH_UNIT:
      return {
        ...state,
        ...{
          unit: action.unit,
        },
      };
    case Types.UPDATE_CUSTOM_NETWORK:
      return {
        ...state,
        ...{
          customNetwork: action.customNetwork,
        },
      };
    case Types.UPDATE_NETWORK_STATUS:
      return {
        ...state,
        ...{
          isConnected: action.isConnected,
        },
      };
    case Types.UPDATE_NETWORK_ERROR:
      return {
        ...state,
        isError: action.isError,
        isErrorByType: action.isErrorByType,
      };
    case Types.UPDATE_NETWORK_IS_LOADING:
      return {
        ...state,
        isLoadingNetwork: action.isLoading,
      };
    case Types.CUSTOM_NETWORK_VALIDATION_ERROR:
      if (action.customNetworkError) {
        return {
          ...state,
          ...{
            customNetworkError: action.customNetworkError,
          },
        };
      }
      return {
        ...state,
        ...{
          customNetworkError: {
            customNetworkIsValid: true,
            customNetworkErrorMessage: null,
          },
        },
      };
    case Types.CUSTOM_NETWORK_VALIDATION_SUCCESS:
      return {
        ...state,
        ...{
          customNetworkSuccess: action.customNetworkSuccess,
        },
      };
    case Types.UPDATE_DEVELOPER_MODE:
      return {
        ...state,
        ...{
          isDeveloperMode: action.isDeveloperMode,
        },
      };
    case Types.UPDATE_OFFLINE_MODE:
      return {
        ...state,
        isOfflineMode: action.isOfflineMode,
      };
    default:
      return state;
  }
};

export default reducer;
