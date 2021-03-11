import keyring from '@polkadot/ui-keyring';
import { BN } from 'bn.js';
import { BAD_REQUEST } from '../../lib/constants/api';
import { getCurrentAccount } from './store/account-store';
import { getCurrentNetwork } from './network-service';
import { getApi, getTokenDecimals } from '../apis/chain';

const candyTemplate = {
  network: null,
  accountAddress: null,
  tokenName: 'Candy',
  tokenSymbol: 'Candy',
  decimals: '15',
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
  token.decimals = getTokenDecimals().toString();

  try {
    const balance = await getApi().query.candy.balances(currentAccount.address);
    token.balance = balance.toString();
  } catch (e) {
    token.balance = '0';
  }

  return token;
};

export const getTokenList = async () => {
  const token = await getCandyToken();

  return [token];
};

export const getCandyBalance = async () => {
  const token = await getCandyToken();
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
