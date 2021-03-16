import { APP_STATE_READY, APP_STATE_SET_HASH_KEY, APP_STATE_ONBOARDED, APP_STATE_CLEAR_HASH_KEY } from '../actions/app-state';

const initialState = {
  isAppReady: false,
  hashKey: undefined,
  isAppOnBoarded: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case APP_STATE_READY:
      return { ...state, isAppReady: action.ready };
    case APP_STATE_ONBOARDED:
      return { ...state, isAppOnBoarded: action.ready };
    case APP_STATE_SET_HASH_KEY:
      return { ...state, hashKey: action.hashKey };
    case APP_STATE_CLEAR_HASH_KEY:
      return { ...state, hashKey: undefined };
    default:
      return state;
  }
};

export default appState;
