import * as Types from './action-types';
import { ACCOUNT_MENU_OPTIONS } from '../../constants/options';

const cruDefault = {
  balance: '-',
  decimals: 12,
  tokenName: 'CRU',
  tokenSymbol: 'CRU',
};

const candyDefault = {
  balance: '-',
  decimals: 12,
  tokenName: 'Candy',
  tokenSymbol: 'Candy',
};

const csmDefault = {
  balance: '-',
  decimals: 12,
  tokenName: 'CSM',
  tokenSymbol: 'CSM',
};

const initialState = {
  accountMenu: ACCOUNT_MENU_OPTIONS,
  transactions: [],
  pendingTransfers: [],
  tokens: [cruDefault, candyDefault, csmDefault],
  token: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_TRANSACTION_LIST:
      return {
        ...state,
        ...{
          transactions: action.transactions,
        },
      };
    case Types.UPDATE_PENDING_TRANSACTION_LIST:
      return {
        ...state,
        ...{
          pendingTransfers: action.pendingTransfers,
        },
      };
    case Types.UPDATE_TOKEN_LIST:
      return {
        ...state,
        ...{
          tokens: action.tokens,
        },
      };
    case Types.UPDATE_SELECTED_TOKEN:
      return {
        ...state,
        ...{
          token: action.token,
        },
      };
    default:
      return state;
  }
};

export default reducer;
