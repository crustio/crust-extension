import { CRUST_UPDATE_TIME } from '../../lib/constants/update';
import { Transaction, Tokens } from '../api';
import { SUCCESS, FAIL } from '../../lib/constants/transaction';
import {
  getTransactions,
  updateTransactions,
  updateTokenList,
  fetchTransactionHistory,
} from '../views/dashboard/actions';
import * as AccountActions from '../actions/account';
import { getTransfersWithMoment } from '../../lib/services/static-message-factory-service';
import watchBg from './watch-bg';

export async function pollPendingTransactions(store) {
  try {
    const { pendingTransfers } = store.getState().dashboardReducer;

    if (pendingTransfers.length > 0) {
      const txResponsePromises = pendingTransfers.map(async tx => {
        const { result: txResponse } = await Transaction.getTransaction(
          tx.internal.network,
          tx.internal.address,
          tx.txnHash,
        );
        return txResponse;
      });
      const res = await Promise.all(txResponsePromises);
      const polledTransfers = res.filter(tx => tx.status === SUCCESS || tx.status === FAIL);

      if (polledTransfers.length > 0) {
        store.dispatch(getTransactions);
        store.dispatch(fetchTransactionHistory);
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error in polling transactions from interval');
  }
}

export async function updateBalance(store) {
  try {
    const { tokens } = store.getState().dashboardReducer;
    store.dispatch(AccountActions.fetchAndSetBalances);
    const { balance } = store.getState().accountReducer;

    /* eslint-disable */
    for (const token of tokens) {
      if (token.tokenSymbol === 'CRU') {
        token.balance = balance.balance;
        token.locked = balance.locked;
        token.reserved = balance.reserved;
        token.total = balance.total;
      }
    }
    /* eslint-enable */

    store.dispatch(updateTokenList(tokens));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error in updating balance from interval');
  }
}

export async function updateTransactionItemTime(store) {
  try {
    const { transactions } = store.getState().dashboardReducer;
    const transfersWithModifiedTime = getTransfersWithMoment(transactions);
    store.dispatch(updateTransactions(transfersWithModifiedTime));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error in updating  time for the transaction item time');
  }
}

export async function updateAllTokenBalance(store) {
  try {
    const { network } = store.getState().networkReducer;
    const { result } = await Tokens.getTokens(network);
    const { tokens } = store.getState().dashboardReducer;

    if (!result || result.length === 0) {
      const t = tokens.filter(token => token.tokenSymbol === 'CRU');
      store.dispatch(updateTokenList(t));
      return;
    }

    if (!tokens || tokens.length === 0) {
      return;
    }

    /* eslint-disable */
    for (const token of tokens) {
      for (const r of result) {
        if (token.tokenSymbol === r.tokenSymbol) {
          token.balance = r.balance;
        }
      }
    }
    /* eslint-enable */

    store.dispatch(updateTokenList(tokens));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error in updating all tokens balance');
  }
}

async function updateApplicationStateHelper(store) {
  const { isOnBoarded } = store.getState().appStateReducer;
  if (isOnBoarded) {
    await pollPendingTransactions(store);
    await updateBalance(store);
    await updateTransactionItemTime(store);
    await updateAllTokenBalance(store);
  }
}

export async function updateApplicationState(store) {
  watchBg(store, {
    updateApplicationStateHelper,
  });
  await updateApplicationStateHelper(store);
  setInterval(async () => {
    await updateApplicationStateHelper(store);
  }, CRUST_UPDATE_TIME);
}
