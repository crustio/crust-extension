import * as Types from './action-types';

const initialState = {
  currentTab: 0,
  selectedAccounts: [],
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
    case Types.UPDATE_SELECTED_ACCOUNTS:
      return {
        ...state,
        ...{
          selectedAccounts: action.selectedAccounts,
        },
      };
    default:
      return state;
  }
};

export default reducer;
