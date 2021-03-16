import { EXPORTING_ACCOUNT } from './action-types';

const initialState = {
  account: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORTING_ACCOUNT:
      return {
        ...state,
        ...{
          account: action.account,
        },
      };
    default:
      return state;
  }
};

export default reducer;
