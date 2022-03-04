export const WESTEND_NETWORK = {
  text: 'Westend',
  value: 'Westend',
  networkURL: 'wss://westend-rpc.polkadot.io',
  networkPort: '',
  networkFullUrl: 'wss://westend-rpc.polkadot.io',
  transactionUrl: 'https://westend.subscan.io/extrinsic',
  unit: 'WND',
};

export const KUSAMA_NETWORK = {
  text: 'Kusama',
  value: 'Kusama',
  networkURL: 'wss://kusama-rpc.polkadot.io/',
  networkPort: '',
  networkFullUrl: 'wss://kusama-rpc.polkadot.io/',
  transactionUrl: 'https://kusama.subscan.io/extrinsic',
  unit: 'KSM',
};

export const EDGEWARE_NETWORK = {
  text: 'Edgeware',
  value: 'Edgeware',
  networkURL: 'wss://mainnet1.edgewa.re/',
  networkPort: '',
  networkFullUrl: 'wss://mainnet1.edgewa.re/',
  transactionUrl: 'https://edgeware.subscan.io/extrinsic',
  unit: 'EDG',
};

export const BERESHEET_NETWORK = {
  text: 'Beresheet',
  value: 'Beresheet',
  networkURL: 'wss://beresheet1.edgewa.re/',
  networkPort: '',
  networkFullUrl: 'wss://beresheet1.edgewa.re/',
  //transactionUrl: 'https://beresheet.subscan.io/extrinsic',
  unit: 'tEDG',
};

export const LOCALHOST_NETWORK = {
  text: 'Localhost',
  value: 'localhost',
  networkURL: 'ws://127.0.0.1',
  networkPort: '9944',
  networkFullUrl: 'ws://127.0.0.1:9944',
  unit: 'CRU',
};

export const CRUST_MAXWELL_NETWORK = {
  text: 'Crust Maxwell',
  value: 'crust maxwell',
  networkURL: 'wss://api-maxwell.crust.network',
  networkPort: '',
  networkFullUrl: 'wss://api-maxwell.crust.network',
  transactionUrl: 'https://maxwell.subscan.io/extrinsic/',
  unit: 'CRU',
  url_apps: 'https://apps.crust.network/?rpc=wss%3A%2F%2Fapi-maxwell.crust.network#/explorer',
  def_ss58: 42,
  def_decimals: 12,
};

export const CRUST_NETWORK = {
  text: 'Crust Mainnet',
  value: 'crust',
  networkURL: 'wss://rpc.crust.network',
  networkPort: '',
  networkFullUrl: 'wss://rpc.crust.network',
  transactionUrl: 'https://crust.subscan.io/extrinsic/',
  unit: 'CRU',
  url_name: 'Get CRU',
  url_apps: 'https://swap.crustapps.net',
  def_ss58: 66,
  def_decimals: 12,
};

export const CRUST_DEV_NETWORK = {
  text: 'Crust Rocky',
  value: 'crust rocky',
  networkURL: 'wss://rocky-api.crust.network',
  networkPort: '',
  networkFullUrl: 'wss://rocky-api.crust.network',
  unit: 'CRU',
  def_ss58: 66,
  def_decimals: 12,
};

// export const DOT_NETWORK_LIST = [EDGEWARE_NETWORK, KUSAMA_NETWORK];
export const DOT_NETWORK_LIST = [CRUST_NETWORK, CRUST_MAXWELL_NETWORK];

export const DEV_DOT_NETWORK_LIST = [LOCALHOST_NETWORK, CRUST_NETWORK, CRUST_MAXWELL_NETWORK];

const isDev = false;

export const DEFAULT_NETWORK = isDev ? CRUST_DEV_NETWORK : CRUST_NETWORK;
// Custom Network Validation

export const CUSTOM = 'custom';
export const HTTPS = 'https';
export const HTTP = 'http';
export const LOCALHOST = 'localhost';
export const WS = 'ws';
export const WSS = 'wss';
export const DEFAULT_NON_SSL_PORT = '9944';
export const DEFAULT_SSL_PORT = '443';
