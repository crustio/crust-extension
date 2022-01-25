import {
  MANAGE_ACCOUNT_PAGE,
  ADDRESS_BOOK_PAGE,
  ADD_TOKEN_PAGE,
  LANGUAGE_SETTING_PAGE,
  IMPORT_JSON_PAGE,
} from './navigation';

import {
  IMPORT_FROM_PHRASE_BUTTON_TEXT,
  IMPORT_FROM_JSON_BUTTON_TEXT,
  CREATE_ACCOUNT_BUTTON_TEXT,
  EXPORT_ACCOUNT_BUTTON_TEXT,
} from './account';

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

export const EXPORT_ACCOUNT = {
  text: EXPORT_ACCOUNT_BUTTON_TEXT,
  value: 'export_account',
};

export const REMOVE = {
  text: 'Remove',
  value: 'remove',
};

export const ADD_ACCOUNT = {
  text: CREATE_ACCOUNT_BUTTON_TEXT,
  value: 'create_account',
};

export const IMPORT_PHRASE = {
  text: IMPORT_FROM_PHRASE_BUTTON_TEXT,
  value: 'from_phrase',
};

export const IMPORT_JSON = {
  text: IMPORT_FROM_JSON_BUTTON_TEXT,
  value: IMPORT_JSON_PAGE,
};

export const ADD_ADDRESS = {
  text: 'Add Address',
  value: 'add_address',
};

export const LANGUAGE_SETTING = {
  text: 'Language Setting',
  value: LANGUAGE_SETTING_PAGE,
};

export const NetworkMode = {
  value: 'network_mode',
};

export const Lock = {
  text: 'Lock',
  value: 'lock',
};

export const GET_CRU = {
  text: 'Get CRU',
  value: 'get_cru',
};

export const OPTIONS = [ADDRESS_BOOK, LANGUAGE_SETTING, NetworkMode, Lock, GET_CRU, ABOUT];

export const ACCOUNT_MENU_OPTIONS = [RENAME];

export const ACCOUNT_MANAGEMENT_MENU_OPTIONS = [ADD_ACCOUNT, IMPORT_PHRASE, IMPORT_JSON];

export const ACCOUNT_MANAGEMENT_OPTIONS = [EXPORT_ACCOUNT, REMOVE];

export const ADDRESS_BOOK_MENU_OPTIONS = [ADD_ADDRESS];

export const ADDRESS_BOOK_OPTIONS = [REMOVE];
