/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { setChain, setDefSs58Format } from './chain';

const { typesBundleForPolkadot } = require('@crustio/type-definitions');

const connection = {
  isConnected: false,
  api: null,
  provider: null,
  currentNetwork: null,
};

const disconnect = () => {
  if (connection.isConnected) {
    try {
      connection.provider.disconnect();
      connection.isConnected = false;
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
  const { networkFullUrl, name, def_ss58 = 42 } = network;
  // eslint-disable-next-line
  console.log('--connect--', networkFullUrl, name, connection);
  if (name === 'dotcustom') {
    disconnect();
  }
  if (networkFullUrl && networkFullUrl !== '') {
    try {
      const provider = new WsProvider(networkFullUrl);
      const api = new ApiPromise({
        provider,
        typesBundle: typesBundleForPolkadot,
      });
      await api.isReadyOrError;
      if (api.isConnected) {
        // eslint-disable-next-line
        console.log('connected--', networkFullUrl);
        connection.provider = provider;
        connection.isConnected = api.isConnected;
        connection.api = api;
        connection.currentNetwork = network;
        setDefSs58Format(def_ss58);
        await setChain(api);
        return connection;
      }
      // eslint-disable-next-line
      console.error('connect error--', api);
      disconnect();
    } catch (e) {
      // eslint-disable-next-line
      console.error('connect error--', e);
      disconnect();
      throw e;
    }
  }
};

// call when network changes
export const connectToApi = async (network, force) => {
  const { networkFullUrl } = network;
  if (connection.isConnected && !force) {
    if (connection.currentNetwork.networkFullUrl === networkFullUrl) {
      return connection;
    }
  }
  return connect(network);
};

export const getApi = () => connection.api;

export const isConnected = () => connection.isConnected;
