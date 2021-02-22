import { MANAGE_ACCOUNT_PAGE, ADDRESS_BOOK_PAGE, ADD_TOKEN_PAGE, LANGUAGE_SETTING_PAGE } from './navigation';

export const ADD_TOKEN = {
  text: 'Add Token',
  value: ADD_TOKEN_PAGE,
};

export const ABOUT = {
  text: 'About',
  value: 'about',
};

export const DEVELOPER_MODE = {
  text: 'Developer mode',
  value: 'developer_mode',
  toggle: true,
};
export const MANAGE_ACCOUNT = {
  text: 'Account Management',
  value: MANAGE_ACCOUNT_PAGE,
};

export const ADDRESS_BOOK = {
  text: 'Address Book',
  value: ADDRESS_BOOK_PAGE,
};

export const RENAME = {
  text: 'Rename',
  value: 'rename',
};

export const REMOVE = {
  text: 'Remove',
  value: 'remove',
};

export const ADD_ACCOUNT = {
  text: 'Add Account',
  value: 'add_account',
};

export const ADD_ADDRESS = {
  text: 'Add Address',
  value: 'add_address',
};

export const LANGUAGE_SETTING = {
  text: 'Language Setting',
  value: LANGUAGE_SETTING_PAGE,
};

export const OPTIONS = [MANAGE_ACCOUNT, ADDRESS_BOOK, LANGUAGE_SETTING, ABOUT];

export const ACCOUNT_MENU_OPTIONS = [RENAME];

export const ACCOUNT_MANAGEMENT_MENU_OPTIONS = [ADD_ACCOUNT];

export const ACCOUNT_MANAGEMENT_OPTIONS = [REMOVE];

export const ADDRESS_BOOK_MENU_OPTIONS = [ADD_ADDRESS];
