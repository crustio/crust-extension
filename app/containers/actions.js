import * as Types from './action-types';
import { fetchManifest, fetchLanguage, setLangeuage } from '../api/on-boarding';
import { ENGLISH } from '../constants/language';
import { createToast } from '../constants/toast';

export const changePage = page => ({
  type: Types.APPSTATE_CHANGE_PAGE_STATUS,
  page,
});

export const updateIsAppOnBoarded = isOnBoarded => ({
  type: Types.APPSTATE_IS_APP_ONBOARDED,
  isOnBoarded,
});

export const updateAppLoading = isLoading => ({
  type: Types.APPSTATE_IS_LOADING,
  isLoading,
});

export const updateAppManifest = manifest => ({
  type: Types.APPSTATE_MANIFEST,
  manifest,
});

export const updateBackupPage = backupPage => ({
  type: Types.APPSTATE_UPDATE_BACKUP_PAGE,
  backupPage,
});

export const updateLanguage = language => ({
  type: Types.APPSTATE_LANGUAGE,
  language,
});

export const fetchAndUpdateAppManifest = () => async dispatch => {
  const manifest = await fetchManifest();
  dispatch(updateAppManifest(manifest));
};

export const fetchAndUpdateLanguage = () => async dispatch => {
  const { result } = await fetchLanguage();

  if (result.language !== undefined) {
    dispatch(updateLanguage(result.language));
  } else {
    dispatch(updateLanguage(ENGLISH));
  }
}

export const updateAppLanguage = (language, i18n) => async dispatch => {
  try {
    await setLangeuage(language);
    dispatch(updateLanguage(language));
    i18n.changeLanguage(language);
  } catch (e) {
    dispatch(createToast({ message: 'Error set language', type: 'error' }));
  }
}
