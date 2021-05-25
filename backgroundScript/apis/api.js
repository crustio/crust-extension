/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { setChain } from './chain';

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
  const { networkFullUrl, name } = network;
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
        connection.provider = provider;
        connection.isConnected = api.isConnected;
        connection.api = api;
        connection.currentNetwork = network;
        await setChain(api);
        return connection;
      }
      disconnect();
    } catch (e) {
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
