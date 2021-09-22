import * as SK from '../../constants/storage-keys';
import * as S from './storage';

export const getOfflineMode = async () => (await S.getLocalStorage(SK.IS_OFFLINE_MODE)).isOfflineMode;
export const setOfflineMode = isOfflineMode => S.setLocalStorage(SK.IS_OFFLINE_MODE, isOfflineMode);
