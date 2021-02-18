/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { setChain } from './chain';
import crustTypes from './spec'

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
  let api;
  const { networkFullUrl, name } = network;
  if (name === 'dotcustom') {
    disconnect();
  }
  if (networkFullUrl !== undefined && networkFullUrl !== null && networkFullUrl !== '') {
    return new Promise((resolve, reject) => {
      const provider = new WsProvider(networkFullUrl, false);
      provider
        .connect()
        .then(() => {
          provider.on('error', () => {
            provider.disconnect();
            reject(error);
          });
          provider.on('connected', () => {
            const apiPromise = ApiPromise.create({
              provider,
              types: crustTypes,
            });
            apiPromise
              .then(api => {
                disconnect();
                connection.provider = provider;
                connection.isConnected = api.isConnected;
                connection.api = api;
                connection.currentNetwork = network;
                setChain(api)
                  .then(() => {
                    resolve(connection);
                  })
                  .catch(error => {
                    disconnect();
                    reject(error);
                  });
              })
              .catch(() => {
                disconnect();
                reject(error);
              });
          });
        })
        .catch(() => {
          disconnect();
          reject(error);
        });
    });
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
