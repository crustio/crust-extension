import { EXPORTING_ACCOUNT } from './action-types';

const initialState = {
  address: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORTING_ACCOUNT:
      return {
        ...state,
        ...{
          address: action.address,
        },
      };
    default:
      return state;
  }
};

export default reducer;
