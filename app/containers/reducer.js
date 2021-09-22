import * as Types from './action-types';
import { LOADER_OVERLAY, DASHBOARD_PAGE } from '../constants/navigation';
import { OPTIONS } from '../constants/options';
import { LINKS } from '../constants/links';
import { ENGLISH } from '../constants/language';

const initialState = {
  page: LOADER_OVERLAY,
  isLoading: false,
  isOnBoarded: false,
  options: OPTIONS,
  manifest: undefined,
  links: LINKS,
  backupPage: DASHBOARD_PAGE,
  language: ENGLISH,
  showValidatePass: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.APPSTATE_CHANGE_PAGE_STATUS:
      return {
        ...state,
        ...{
          page: action.page,
        },
      };
    case Types.APPSTATE_IS_LOADING:
      return {
        ...state,
        ...{
          isLoading: action.isLoading,
        },
      };
    case Types.APPSTATE_IS_APP_ONBOARDED:
      return {
        ...state,
        ...{
          isOnBoarded: action.isOnBoarded,
        },
      };
    case Types.APPSTATE_MANIFEST:
      return {
        ...state,
        ...{
          manifest: action.manifest,
        },
      };
    case Types.APPSTATE_UPDATE_BACKUP_PAGE:
      return {
        ...state,
        ...{
          backupPage: action.backupPage,
        },
      };
    case Types.APPSTATE_LANGUAGE:
      return {
        ...state,
        ...{
          language: action.language,
        },
      };
    case Types.APPSTATE_SHOW_VALIDATE_PASSWORD:
      return {
        ...state,
        showValidatePass: action.showValidatePass,
      };
    default:
      return state;
  }
};

export default reducer;
