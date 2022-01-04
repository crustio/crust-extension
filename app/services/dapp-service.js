import * as ApiType from '../api';

export const submitTransaction = async (transactionObj, password) => {
  const {
    request: { opts },
  } = transactionObj;

  const dApp = true;
  await ApiType.DApp.submitTransaction(opts, transactionObj, dApp, password);
};

export const signMessage = async (data, password) => {
  await ApiType.DApp.signMessage(data, password);
};

export const allowMetadataProvide = async data => {
  await ApiType.DApp.allowMetadataProvide(data);
};
