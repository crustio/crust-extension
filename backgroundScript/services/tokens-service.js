import keyring from '@polkadot/ui-keyring';
import { BN } from 'bn.js';
import { BAD_REQUEST, SUCCESS, FAILURE } from '../../lib/constants/api';
import { getCurrentAccount } from './store/account-store';
import { getCurrentNetwork } from './network-service';
import { getApi, getTokenDecimals } from '../apis/chain';

const candyTemplate = {
  network: null,
  accountAddress: null,
  tokenName: 'Candy',
  tokenSymbol: 'Candy',
  decimals: 12,
  balance: '0',
};

export const getCandyToken = async () => {
  const currentAccount = getCurrentAccount();
  const currentNetwork = getCurrentNetwork();

  if (!currentAccount || !currentNetwork) {
    return {
      status: BAD_REQUEST,
      message: 'Invalid account or network.',
    };
  }

  const token = { ...candyTemplate };
  token.network = currentNetwork;
  token.accountAddress = currentAccount.address;
  token.decimals = getTokenDecimals();

  try {
    const balance = await getApi().query.candy.balances(currentAccount.address);
    token.balance = balance.toString();
    token.status = SUCCESS;
  } catch (e) {
    token.balance = '0';
    token.status = FAILURE;
  }

  return token;
};

const csmTemplate = {
  network: null,
  accountAddress: null,
  tokenName: 'CSM',
  tokenSymbol: 'CSM',
  decimals: 12,
  balance: '0',
};

export const getCSMToken = async () => {
  const currentAccount = getCurrentAccount();
  const currentNetwork = getCurrentNetwork();

  if (!currentAccount || !currentNetwork) {
    return {
      status: BAD_REQUEST,
      message: 'Invalid account or network.',
    };
  }

  const token = { ...csmTemplate };
  token.network = currentNetwork;
  token.accountAddress = currentAccount.address;

  try {
    const account = await getApi().query.csm.account(currentAccount.address);
    token.balance = account.free.toString();
    token.status = SUCCESS;

    if (account.miscFrozen && !account.miscFrozen.isZero()) {
      token.balance = account.free.sub(account.miscFrozen).toString();
      token.locked = account.miscFrozen.toString();
    }
    if (account.reserved && !account.reserved.isZero()) {
      token.total = account.free.add(account.reserved).toString();
    }
  } catch (e) {
    token.balance = '0';
    token.status = FAILURE;
  }
  return token;
};

export const getTokenList = async () => {
  const candy = await getCandyToken();
  const csm = await getCSMToken();
  return [candy, csm];
};

export const getCandyBalance = async () => {
  const token = await getCandyToken();
  return token.balance;
};

export const getCSMBalance = async () => {
  const token = await getCSMToken();
  return token.balance;
};

export const signCandyTransaction = async (transaction, password) => {
  const { to, fAmount } = transaction.metadata;

  const currentAccount = getCurrentAccount();
  const accountPair = keyring.getPair(currentAccount.address);

  accountPair.decodePkcs8(password);

  const nonce = await getApi().rpc.system.accountNextIndex(currentAccount.address);
  const signedT = await getApi()
    .tx.candy.transfer(to, new BN(fAmount))
    .signAsync(accountPair, { nonce });

  return signedT;
};

export const signCSMTransaction = async (transaction, password) => {
  const { to, fAmount } = transaction.metadata;

  const currentAccount = getCurrentAccount();
  const accountPair = keyring.getPair(currentAccount.address);

  accountPair.decodePkcs8(password);

  const nonce = await getApi().rpc.system.accountNextIndex(currentAccount.address);
  const signedT = await getApi()
    .tx.csm.transfer(to, new BN(fAmount))
    .signAsync(accountPair, { nonce });

  return signedT;
};
