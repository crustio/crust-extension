import * as Types from './action-types';

const initialState = {
  currentTab: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_CURRENT_TAB:
      return {
        ...state,
        ...{
          currentTab: action.currentTab,
        },
      };
    default:
      return state;
  }
};

export default reducer;
