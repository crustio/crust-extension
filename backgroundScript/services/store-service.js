import * as appActions from '../actions/app-state';
import { getStore } from '../store/store-provider';
import * as accountActions from '../actions/accounts';
import * as transactionActions from '../actions/transactions';
import * as networkStateActions from '../actions/networks';
import * as permissionStateActions from '../actions/permissions';
import { updateAddressBookList } from '../actions/address-book';
import { updateTokenList } from '../actions/crust-tokens';
import { dispatchUpdateMetadata } from '../actions/dapp-data';
import * as Chain from '../../lib/constants/chain';
import * as StorageServices from '../../lib/services/extension/storage';
import { METADATA_LIST } from '../../lib/constants/storage-keys';

export const updateHashKeyState = async hashKey => getStore().dispatch(appActions.appStateSetHashKey(hashKey));

export const updateAppState = async () => getStore().dispatch(appActions.appStateReady());

export const updateClearHashKeyState = async () => getStore().dispatch(appActions.appStateClearHashKey());

export const updateAppOnBoarded = async () => getStore().dispatch(appActions.appStateOnBoarded());

export const updatesAccountsState = async accounts => getStore().dispatch(accountActions.updateAccountList(accounts));

export const updateCurrentAccountState = async account => getStore().dispatch(accountActions.changeCurrentAccount(account));

export const updateTransactionsState = async transactions => getStore().dispatch(transactionActions.fetchTransactions(transactions));

export const updateCurrentNetworkState = async network => getStore().dispatch(networkStateActions.updateCurrentNetwork(network));

export const updateDeveloperMode = async isDeveloperMode => getStore().dispatch(networkStateActions.updateDeveloperMode(isDeveloperMode));

export const updateWhiteListedDAppsState = async whiteListedDApps => getStore().dispatch(permissionStateActions.updateAuthorizedDAppList(whiteListedDApps));

export const updateAddressBook = addreesBook => getStore().dispatch(updateAddressBookList(addreesBook));

export const updateMetadataList = metadata_list => getStore().dispatch(dispatchUpdateMetadata(metadata_list));

export const getChainMetadataList = () => {
  const { metadata_list } = getStore().getState().dAppDataState;
  if (!metadata_list || metadata_list.length === 0) {
    return Chain.CHAIN;
  }
  return metadata_list;
};

export const getLiteMetadataList = () => getChainMetadataList().map(item => ({
  genesisHash: item.genesisHash,
  specVersion: item.specVersion,
}));

export const updateChainMetadata = async metadata => {
  const metadata_list = getChainMetadataList();
  const chain = metadata_list.find(item => item.genesisHash === metadata.genesisHash);
  if (!chain) return;
  const newChain = { ...chain, ...metadata };
  const list = metadata_list.filter(item => item.genesisHash !== metadata.genesisHash);
  const newList = [...list, newChain];
  updateMetadataList(newList);
  await StorageServices.setLocalStorage(METADATA_LIST, newList);
};

export const findChain = genesisHash => getChainMetadataList().find(item => item.genesisHash === genesisHash);

export const findChainByName = name => getChainMetadataList().find(item => item.value === name);

export const updateCrustTokens = tokens => getStore().dispatch(updateTokenList(tokens));
