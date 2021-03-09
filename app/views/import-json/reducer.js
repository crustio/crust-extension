import { UPDATE_JSON_PWD_ERROR, UPDATE_WALLET_PWD_ERROR } from './actions';

const initialState = {
  jsonPwdError: '',
  walletPwdError: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_JSON_PWD_ERROR:
      return {
        ...state,
        ...{
          jsonPwdError: action.jsonPwdError,
        },
      };
    case UPDATE_WALLET_PWD_ERROR:
      return {
        ...state,
        ...{
          walletPwdError: action.walletPwdError,
        },
      };
    default:
      return state;
  }
};

export default reducer;
