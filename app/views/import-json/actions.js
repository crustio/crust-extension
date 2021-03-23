import * as AppActions from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { setAndStartOnBoarding } from '../create-account/actions';
import { Account } from '../../api';

export const UPDATE_JSON_PWD_ERROR = 'IMPORT/JSON_PWD_ERROR';
export const UPDATE_WALLET_PWD_ERROR = 'IMPORT/WALLET_PWD_ERROR';

export const updateJsonPwdError = jsonPwdError => ({
  type: UPDATE_JSON_PWD_ERROR,
  jsonPwdError,
});

export const updateWalletPwdError = walletPwdError => ({
  type: UPDATE_WALLET_PWD_ERROR,
  walletPwdError,
});

export const createAccountWithJson = (json, oldPwd, password, t) => async dispatch => {
  try {
    dispatch(AppActions.updateAppLoading(true));
    const account = await Account.createAccountWithJson(json, oldPwd, true, password);
    const { alias: newAlias } = account;
    dispatch(createToast({ message: t('onCreateAccount', { var: newAlias }), type: 'success' }));
    dispatch(setAndStartOnBoarding());
  } catch (e) {
    if (e.message.indexOf('json') > -1) {
      dispatch(updateJsonPwdError(e.message));
    } else {
      dispatch(updateWalletPwdError(e.message));
    }
    dispatch(AppActions.updateAppLoading(false));
  }
};
