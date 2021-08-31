import { decodeAddress } from '@polkadot/keyring';
import { keccak512 } from 'js-sha3';
import { getWallet } from './wallet-service';
import { getStore } from '../store/store-provider';
import * as accountActions from '../actions/accounts';
import * as StorageServices from '../../lib/services/extension/storage';
import { ACCOUNTS } from '../../lib/constants/storage-keys';
import { updatesAccountsState, updateCurrentAccountState } from './store-service';
import { KEYPAIR_EDWARDS, DUPLICATE_ALIAS, BAD_REQUEST } from '../../lib/constants/api';
import { getAccountState } from './store/account-store';
import { validateAddress } from '../../lib/services/validation-service';
import * as DotWallet from '../apis/core-polkadot/dot-wallet';

export const validateAlias = alias => {
  if (alias !== undefined && alias !== null && alias !== '') {
    const { accounts } = getAccountState();
    const duplicateAlias = accounts.find(x => x.alias === alias);
    if (duplicateAlias) throw new Error(DUPLICATE_ALIAS);
    return alias;
  }
  throw new Error('alias in required');
};

const constructAlias = n => {
  const { accounts } = getAccountState();
  const alias = `Account ${accounts.length + n}`;
  try {
    const vAlias = validateAlias(alias);
    return vAlias;
  } catch (err) {
    const newn = n + 1;
    return constructAlias(newn);
  }
};

export const getAddressByAddr = addr => {
  const wallet = getWallet();
  return wallet.getAddressByAddr(addr);
};

export const getAddress = (seedWords, keypairType) => {
  const wallet = getWallet();
  const address = wallet.getAddress(seedWords, keypairType);
  return address;
};

export const getAddressByAccount = account => {
  if (account.fromJson) {
    return getAddressByAddr(account.address);
  }

  return getAddress(account.seedWords, account.keypairType);
};

export const createSeedWords = () => {
  const wallet = getWallet();
  const seedWords = wallet.createSeedWords();
  getStore().dispatch(accountActions.setSeedWords(seedWords));
  return seedWords;
};

export const createAccountWithSeed = (seedWords, keypairType, isOnBoarding, alias, password) => {
  const address = DotWallet.getAddressWithPassword(seedWords, keypairType, alias, password);
  const accountAlias = alias === undefined ? constructAlias(1) : validateAlias(alias);
  return {
    seedWords,
    address,
    keypairType,
    alias: accountAlias,
  };
};

export const createNewAccount = keypairType => {
  const seedWords = createSeedWords();
  const address = DotWallet.getAddress(seedWords, keypairType);
  return {
    seedWords,
    address,
    keypairType,
    alias: constructAlias(address),
  };
};

const accountExists = (accounts, newAccount) => {
  const duplicateAccount = accounts.find(account => account.address === newAccount.address);
  if (duplicateAccount !== undefined) {
    throw new Error('Account already exist.');
  }
  return newAccount;
};

const mergeAccounts = (accounts, newAccount) => {
  const newAccounts = [...accounts, { ...newAccount }];
  return newAccounts;
};

export const getAccountForUI = account => ({
  address: getAddressByAccount(account),
  alias: account.alias,
  keypairType: account.keypairType,
});

export const updateJsonAccountAlias = (account, newAlias) => {
  const wallet = getWallet();
  wallet.updateJsonAccountAlias(account, newAlias);
};
export const updateAccountAlias = async (address, newAlias) => {
  const { accounts, currentAccount } = getAccountState();
  //validate alias
  const duplicateAlias = accounts.find(x => x.alias === newAlias);
  if (duplicateAlias === undefined) {
    const accountIndex = accounts.findIndex(obj => {
      const accountAddress = getAddressByAccount(obj);
      return accountAddress === address;
    });
    // update alias
    if (accountIndex >= 0) {
      accounts[accountIndex].alias = newAlias;
      currentAccount.alias = newAlias;
      updateJsonAccountAlias(currentAccount, newAlias);

      await Promise.all([
        updatesAccountsState(accounts),
        updateCurrentAccountState(currentAccount),
      ]);
      return { address, newAlias };
    }
    throw new Error('account is not avalible');
  }
  throw new Error('Duplicate alias');
};

// isOnboarding Require
export const getAccounts = async () => {
  const localAccountObj = await StorageServices.getLocalStorage(ACCOUNTS);
  return localAccountObj;
};

export const validPassword = async password => {
  if (password === undefined || password === null) {
    return false;
  }
  const encryptedPwd = keccak512(password);
  const { appState } = getStore().getState();
  return appState.hashKey && appState.hashKey === encryptedPwd;
};

export const createAccount = async (seedWords, keypairType, isOnBoarding, alias, password) => {
  // default keypair type Edwards
  const keypairTypeValue = keypairType === undefined ? KEYPAIR_EDWARDS.value : keypairType.value;

  if (seedWords === undefined) {
    throw new Error('invalid seed words');
  }

  const validPwd = await validPassword(password);
  if (!validPwd) {
    throw new Error('wallet password is incorrect');
  }

  // grab all the data
  // const account = seedWords === undefined
  //   ? createNewAccount(keypairTypeValue)
  //   : createAccountWithSeed(seedWords, keypairTypeValue, isOnBoarding, alias, password);
  const account = createAccountWithSeed(seedWords, keypairTypeValue, isOnBoarding, alias, password);
  const { accounts } = getAccountState();
  // find duplication
  const newAccount = accountExists(accounts, account);
  // combine accounts
  const newAccounts = mergeAccounts(accounts, newAccount);
  // set current selected account by default last created account
  await Promise.all([updatesAccountsState(newAccounts), updateCurrentAccountState(account)]);
  // return  created account address
  return account;
};

export const createAccountWithJson = async (json, oldPwd, isOnBoarding, password) => {
  const validPwd = await validPassword(password);
  if (!validPwd) {
    throw new Error('wallet password is incorrect');
  }

  const { accounts } = getAccountState();
  const keypair = DotWallet.restoreAccount(json, oldPwd, password);

  const account = {
    address: keypair.address,
    fromJson: true,
    alias: keypair.meta.name ? keypair.meta.name : 'unknown',
    // keypairType,
  };
  const newAccount = accountExists(accounts, account);
  const newAccounts = mergeAccounts(accounts, newAccount);
  // set current selected account by default last created account
  await Promise.all([updatesAccountsState(newAccounts), updateCurrentAccountState(account)]);

  return account;
};

export const updateCurrentAccount = async address => {
  // default keypair type Edwards
  const { accounts } = getAccountState();
  const newAccount = accounts.find(obj => {
    const accountAddress = getAddressByAccount(obj);
    return accountAddress === address;
  });
  if (newAccount !== undefined) {
    await updateCurrentAccountState(newAccount);
    return newAccount;
  }
  throw new Error('account is not avalible');
};

export const removeAccount = async address => {
  // get privious accounts
  const { accounts, currentAccount } = getAccountState();
  const filteredAccounts = accounts.filter(obj => {
    const accountAddress = getAddressByAccount(obj);
    if (accountAddress !== address) {
      return obj;
    }
  });
  // update reducer state
  await updatesAccountsState(filteredAccounts);
  const currentAccountAddress = getAddressByAccount(currentAccount);
  if (address === currentAccountAddress) {
    const accountIndex = accounts.findIndex(obj => {
      const accountAddress = getAddressByAccount(obj);
      return accountAddress === address;
    });
    if (accountIndex === accounts.length - 1) {
      await updateCurrentAccountState(filteredAccounts[0]);
    } else {
      await updateCurrentAccountState(accounts[accountIndex + 1]);
    }
  }
  return true;
};

export const getAccountStateForUi = accountState => {
  // FE not require seedwords
  const { accounts, currentAccount } = accountState;
  const reformattedCurrentAccount = getAccountForUI(currentAccount);
  const reformattedAccounts = accounts.map(obj => {
    const account = getAccountForUI(obj);
    return account;
  });
  const newAccountState = {
    accounts: reformattedAccounts,
    currentAccount: reformattedCurrentAccount,
    seedWords: accountState.seedWords,
    hasAccount: accountState.hasAccount,
  };
  return newAccountState;
};

export const accountForDapp = accountState => {
  if (accountState === undefined) {
    return {
      status: BAD_REQUEST,
      message: 'The request requires data object for authentication.',
    };
  }
  const { accounts } = accountState;
  if (accounts !== undefined) {
    const reformattedAccounts = accounts.map(obj => {
      const accountsWithoutSeedWords = {
        address: getAddressByAccount(obj),
        name: obj.alias,
        meta: {
          name: obj.alias,
          source: 'crust',
        },
      };
      return accountsWithoutSeedWords;
    });
    return reformattedAccounts;
  }
  return {
    status: BAD_REQUEST,
    message: 'The request requires proper accountState.',
  };
};

export const isValidAddress = address => {
  const wallet = getWallet();
  return wallet.isValidAddress(address);
};

// never share with popup.js
export const getAccount = address => {
  const vAddress = validateAddress(address);
  if (vAddress) return vAddress;
  const { accounts } = getAccountState();
  const accountsWithAddress = accounts.map(obj => {
    const account = {
      ...obj,
      address: getAddressByAccount(obj),
    };
    return account;
  });
  const account = accountsWithAddress.find(
    account => JSON.stringify(decodeAddress(account.address)) === JSON.stringify(decodeAddress(address)),
  );
  if (account) {
    return account;
  }
  throw new Error('Account is not exist');
};

export const existedAccount = acc => {
  const { accounts } = getAccountState();
  const duplicateAccount = accounts.find(account => account.address === acc.address);
  if (duplicateAccount !== undefined) {
    return true;
  }

  return false;
};

export const exportAccount = (address, password) => {
  const wallet = getWallet();
  return wallet.exportAccount(address, password);
};
