import * as Store from './store-service';
import * as Chain from '../../lib/constants/chain';

export const hydrateStore = async latestData => {
  try {
    const {
      accounts: { accounts, currentAccount },
      transactions: { transactionArr },
      permissions: { whiteListedDApps },
      network: { currentNetwork, isDeveloperMode },
      addressBook: { addressBook },
      metadata_list = Chain.CHAIN,
    } = latestData;
    await Promise.all([
      Store.updateCurrentAccountState(currentAccount),
      Store.updateWhiteListedDAppsState(whiteListedDApps),
      Store.updatesAccountsState(accounts),
      Store.updateTransactionsState(transactionArr),
      Store.updateCurrentNetworkState(currentNetwork),
      Store.updateDeveloperMode(isDeveloperMode || false),
      Store.updateAppState(),
      Store.updateAddressBook(addressBook),
      Store.updateMetadataList(metadata_list),
    ]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error in hydrating store...please contact developer team.');
  }
};
