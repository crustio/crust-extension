/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { BN } from 'bn.js';
import { TypeRegistry } from '@polkadot/types';
import keyring from '@polkadot/ui-keyring';
import { getApi } from './api';

export const getAccountPair = account => {
  const accountPair = keyring.getPair(account);
  return accountPair;
};

export const getTxnEncodedLength = async (to, fAmount, seedWords, keypairType) => {
  try {
    const api = getApi();

    const accountPair = getAccountPair({ seedWords, keypairType });
    //replace this with commented line once edgeware upgrade mainnet
    //const { nonce } = await api.query.system.account(accountPair.address);
    const nonce = await api.rpc.system.accountNextIndex(accountPair.address);
    const txnExtrinsic = await api.tx.balances
      .transfer(to, new BN(fAmount))
      .sign(accountPair, { nonce });
    const transactionLength = txnExtrinsic.encodedLength;
    return transactionLength;
  } catch (err) {
    throw new Error('Error in getTxnEncodedLength');
  }
};

export const signTransaction = async (transaction, currentAccount, password) => {
  const { to, fAmount } = transaction.metadata;
  const api = getApi();
  //replace this with commented line once edgeware upgrade mainnet
  //const { nonce } = await api.query.system.account(address);
  const nonce = await api.rpc.system.accountNextIndex(currentAccount.address);
  const accountPair = keyring.getPair(currentAccount.address);

  accountPair.decodePkcs8(password);
  const signTransaction = await api.tx.balances
    .transfer(to, new BN(fAmount))
    .sign(accountPair, { nonce });
  return signTransaction;
};

export const getSignature = async (account, txnPayload, password) => {
  // return to Dapp
  const accountPair = keyring.getPair(account.address);
  accountPair.decodePkcs8(password);
  // const accountPair = getAccountPair(account);
  const registry = new TypeRegistry();
  registry.setSignedExtensions(txnPayload.signedExtensions);
  const signature = registry
    .createType('ExtrinsicPayload', txnPayload, {
      version: txnPayload.version,
    })
    .sign(accountPair);
  return signature;
};
