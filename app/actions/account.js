import * as AccountActionTypes from '../constants/account';
import * as AddressBookActionTypes from '../constants/address-book';
import { Account } from '../api';
import { getDummyBalanceObject } from '../utils/helper';
import { FAILURE } from '../../lib/constants/api';

export const updateAccountList = accounts => ({
  type: AccountActionTypes.ADD_ACCOUNT,
  accounts,
});

export const updateContactList = addressBook => ({
  type: AddressBookActionTypes.UPDATE_ADDRESS_BOOK_LIST,
  addressBook,
});

export const changeSelectedAccount = account => ({
  type: AccountActionTypes.SELECT_ACCOUNT,
  account,
});

export const updateAccountBalance = balances => ({
  type: AccountActionTypes.UPDATE_ACCOUNT_BALANCE,
  balances,
});

export const updateSelectedAccountBalance = balance => ({
  type: AccountActionTypes.UPDATE_SELECTED_ACCOUNT_BALANCE,
  balance,
});

export const setSeedWords = seedWords => ({
  type: AccountActionTypes.SET_SEED_WORDS,
  seedWords,
});

export const resetSeedWords = () => ({
  type: AccountActionTypes.RESET_SEED_WORDS,
});

export const fetchAndSetAccounts = async dispatch => {
  const {
    result: { accounts, currentAccount },
  } = await Account.getAccounts();
  dispatch(updateAccountList(accounts));
  dispatch(changeSelectedAccount(currentAccount));
};

export const fetchAndSetBalances = async (dispatch, getState) => {
  const { accounts, account } = getState().accountReducer;
  const addrArray = accounts.map(({ address }) => address);
  const { result: balances } = await Account.getCurrentBalance(addrArray);
  balances.forEach(bal => {
    if (bal.status === FAILURE) {
      // eslint-disable-next-line no-param-reassign
      bal.balance = '-';
    }
  });
  const balObj = balances.find(acc => acc.address === account.address);
  // Link Faucets with No Transaction yet.
  dispatch(updateAccountBalance(balances));
  dispatch(updateSelectedAccountBalance(balObj));
};

export const setInitialBalance = async (dispatch, getState) => {
  const accountObj = getState().accountReducer;
  const { balances, balance } = getDummyBalanceObject(accountObj);
  dispatch(updateAccountBalance(balances));
  dispatch(updateSelectedAccountBalance(balance));
};

export const getSeedWords = () => async dispatch => {
  const seedWords = await Account.getSeedWords();
  if (seedWords !== undefined) {
    dispatch(setSeedWords(seedWords));
  }
};

export const fetchAndSetContacts = async dispatch => {
  const {
    result: { addressBook },
  } = await Account.getContacts();
  dispatch(updateContactList(addressBook));
};
