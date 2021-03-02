import * as DashboardActionTypes from './action-types';
import {
  Transaction, Account, Tokens, Network
} from '../../api';
import { RENAME } from '../../constants/options';
import { PENDING } from '../../../lib/constants/transaction';
import {
  getTransfersWithMoment,
  getTransactionsToDisplay,
} from '../../../lib/services/static-message-factory-service';
import { createToast } from '../../constants/toast';
import * as AccountActions from '../../actions/account';


const updateTokens = tokens => ({
  type: DashboardActionTypes.UPDATE_TOKEN_LIST,
  tokens,
});

const updateSelectedToken = token => ({
  type: DashboardActionTypes.UPDATE_SELECTED_TOKEN,
  token,
});

export const updateTransactions = transactions => ({
  type: DashboardActionTypes.UPDATE_TRANSACTION_LIST,
  transactions,
});

const updatePendingTransfers = pendingTransfers => ({
  type: DashboardActionTypes.UPDATE_PENDING_TRANSACTION_LIST,
  pendingTransfers,
});

export const configEditAccount = (option, account) => async dispatch => {
  if (option.value === RENAME.value) {
    const modifiedAccount = {
      ...account,
      editMode: true,
    };
    dispatch(AccountActions.changeSelectedAccount(modifiedAccount));
  }
};

export const configAliasAccount = (alias, account) => async dispatch => {
  const modifiedAccount = {
    ...account,
    editAlias: alias,
  };
  dispatch(AccountActions.changeSelectedAccount(modifiedAccount));
};

export const renameAlias = account => async dispatch => {
  try {
    const { address, editAlias } = account;
    if (editAlias !== undefined && editAlias !== '') {
      const newAlias = editAlias;
      await Account.updateAccountAlias(newAlias, address);
    }
    AccountActions.fetchAndSetAccounts(dispatch);
  } catch (e) {
    dispatch(createToast({ message: 'Error renaming alias', type: 'error' }));
  }
};

export const getTransactions = async (dispatch, getState) => {
  const {
    account: { address },
  } = getState().accountReducer;
  const { network } = getState().networkReducer;
  const { result: transactions } = await Transaction.getTransactions(network, address);
  const modifiedTransactions = getTransactionsToDisplay(transactions);
  const transfersWithModifiedTime = getTransfersWithMoment(modifiedTransactions);

  const pendingTransfers = transactions.filter(transaction => transaction.status === PENDING);
  dispatch(updatePendingTransfers(pendingTransfers === undefined ? [] : pendingTransfers));
  dispatch(updateTransactions(transfersWithModifiedTime.reverse()));
};

export const connectionError = () => async dispatch => {
  dispatch(createToast({ message: 'Wait for connection', type: 'error' }));
};

export const getTokens = async (dispatch, getState) => {
  const {
    account, balance
  } = getState().accountReducer;
  const { network } = getState().networkReducer;
  const decimals = await Network.getChainDecimals();

  const chainToken = {
    network,
    accountAddress: account.address,
    tokenName: network.unit,
    tokenSymbol: network.unit,
    balance: balance.balance,
    decimals: decimals.result,
  };

  let allTokens = [chainToken];

  const {
    result
  } = await Tokens.getTokens();

  allTokens = allTokens.concat(result);
  dispatch(updateTokens(allTokens));
  dispatch(updateSelectedToken(chainToken));
};

export const onTokenSelected = (token) => dispatch => {
  dispatch(updateSelectedToken(token));
};

export const updateTokenList = tokens => dispatch => {
  dispatch(updateTokens(tokens));
};
