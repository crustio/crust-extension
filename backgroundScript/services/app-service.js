// persistence reducer from localstorage
import { hydrateStore } from './hydration-service';
import { startListener } from './storage-service';
import * as MigrationService from './migration-service';
import * as StorageService from '../../lib/services/extension/storage';
import { APP, LANGUAGE } from '../../lib/constants/storage-keys';
import * as API from '../apis/api';
import { DEFAULT_NETWORK } from '../../lib/constants/networks';
import * as Store from './store-service';

export const appReady = async hashKey => {
  // Start all Listener to watch on State and stored once update
  startListener();
  // load from local Storage
  const data = await StorageService.getLocalStorage();
  const { accounts } = data;
  try {
    // Sign IN
    if (accounts !== undefined) {
      // Start Migration Script
      const latestData = await MigrationService.startMigration(data, hashKey);
      const {
        network: { currentNetwork },
      } = latestData;
      await hydrateStore(latestData);
      // define Polkadot Api
      await API.connectToApi(currentNetwork);
      await Store.updateHashKeyState(hashKey);
    } else {
      // Sign UP
      await Promise.all([
        Store.updateHashKeyState(hashKey),
        Store.updateAppState(),
        Store.updateCurrentNetworkState(DEFAULT_NETWORK),
      ]);
      await API.connectToApi(DEFAULT_NETWORK);
    }
    return hashKey;
  } catch (e) {
    return undefined;
  }
};

export const setAppIsOnBoarded = async () => {
  const appState = { isAppOnBoarded: true };
  const onBoarded = await StorageService.setLocalStorage(APP, appState);
  await Store.updateAppOnBoarded(true);
  return onBoarded;
};

export const getAppIsOnBoarded = async () => {
  const appState = await StorageService.getLocalStorage(APP);
  const { isAppOnBoarded } = appState;
  await Store.updateAppOnBoarded(isAppOnBoarded);
  return appState;
};

export const setLanguage = async language => {
  const ret = await StorageService.setLocalStorage(LANGUAGE, language);
  return ret;
};

export const getLanguage = async () => {
  const ret = await StorageService.getLocalStorage(LANGUAGE);
  return ret;
};

export const clearHashKeyState = async () => {
  await Store.updateClearHashKeyState();
  return true;
};
