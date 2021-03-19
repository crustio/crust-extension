import * as MessageTypes from '../../lib/constants/message-types';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const getSeedWords = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CREATE_SEED_WORDS,
  });
  throwIfNoSuccess({ message, status });
  return result;
};

export const createAccount = async (
  seedWords,
  isOnBoarding = false,
  keypairType,
  alias,
  password,
) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CREATE_ACCOUNT,
    seedWords,
    isOnBoarding,
    keypairType,
    alias,
    password,
  });
  throwIfNoSuccess({ message, status });
  return result;
};

export const createAccountWithJson = async (json, oldPwd, isOnBoarding = false, password) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CREATE_ACCOUNT_WITH_JSON,
    json,
    oldPwd,
    isOnBoarding,
    password,
  });
  throwIfNoSuccess({ message, status });
  return result;
};

export const getCurrentAccount = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_CURRENT_ACCOUNT,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getAccounts = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_LIST,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getCurrentBalance = async addresses => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNT_BALANCE,
    addresses,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const updateAccountAlias = async (alias, address) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_UPDATE_ALIAS,
    alias,
    address,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const updateCurrentAccount = async address => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_CURRENT_ACCOUNTS_UPDATE,
    address,
  });
  throwIfNoSuccess({ message, status });
  return result;
};

export const removeAccount = async address => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_REMOVE_ACCOUNT,
    address,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const submitContact = async contact => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ADDRESS_BOOK_ADD,
    contact,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getContacts = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ADDRESS_BOOK_LIST,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const removeContact = async contact => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ADDRESS_BOOK_REMOVE,
    contact,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const exportAccount = async (address, pwd) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_EXPORT,
    address,
    pwd,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const verifyPassword = async password => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_ACCOUNTS_VERIFY_PASSWORD,
    password,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
