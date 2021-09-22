/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { setChain } from './chain';
import { syncNetworkConnected, syncNetworkError, syncNetworkLoading } from '../messaging/sender';
import { getOfflineMode } from '../../lib/services/extension/local';

const { typesBundleForPolkadot } = require('@crustio/type-definitions');

const connection = {
  isConnected: false,
  api: null,
  provider: null,
  currentNetwork: null,
  setConnected: connected => {
    connection.isConnected = connected;
    syncNetworkConnected(connected);
  },
};

export const disconnect = () => {
  if (connection.isConnected) {
    try {
      connection.provider.disconnect();
      connection.setConnected(false);
      connection.provider = null;
      connection.api = null;
      connection.currentNetwork = null;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Could not disconnect polkadot while resetting');
    }
  }
};

const connect = async network => {
  // eslint-disable-next-line camelcase
  const { networkFullUrl, name } = network;
  // eslint-disable-next-line
  console.log('--connect--', networkFullUrl, name, connection);
  if (networkFullUrl && networkFullUrl !== '') {
    try {
      syncNetworkLoading(true);
      if (await getOfflineMode()) {
        throw Error('Current is offline mode');
      }
      const provider = new WsProvider(networkFullUrl);
      const api = new ApiPromise({
        provider,
        typesBundle: typesBundleForPolkadot,
      });
      connection.api = api;
      connection.provider = provider;
      connection.currentNetwork = network;
      api.on('ready', () => {
        syncNetworkError(false, false);
        syncNetworkLoading(false);
        connection.setConnected(true);
        setChain(connection.api, connection.currentNetwork);
      });
      api.on('error', error => {
        const { message } = error;
        const isErrorByType = message
          ? message.includes('Unable to initialize the API: createType')
          : false;
        syncNetworkError(true, isErrorByType);
        syncNetworkLoading(false);
        // eslint-disable-next-line
        console.info('connect onError--msg->', message);
      });
    } catch (e) {
      syncNetworkError(true, false);
      syncNetworkLoading(false);
      // eslint-disable-next-line
      console.error('connect error--', e);
    }
    await setChain(connection.api, network);
    return connection;
  }
};

// call when network changes
export const connectToApi = async (network, force) => {
  const { networkFullUrl } = network;
  if (connection.isConnected && !force) {
    if (connection.currentNetwork.networkFullUrl === networkFullUrl) {
      syncNetworkConnected(true);
      return connection;
    }
  }
  disconnect();
  return connect(network);
};

export const getApi = () => connection.api;

export const isConnected = () => connection.isConnected;
