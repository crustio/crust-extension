import { keccak512 } from 'js-sha3';
import * as APITypes from '../../api';
import * as SignInActionTypes from './action-types';
import * as APIConstants from '../../../lib/constants/api';
import { updateAppLoading } from '../../containers/actions';
import { promiseTimeout } from '../../utils/helper';

const unlockCrustSuccess = () => ({
  type: SignInActionTypes.UNLOCK_CRUST_SUCCESS,
});

const unlockCrustError = error => ({
  type: SignInActionTypes.UNLOCK_CRUST_ERROR,
  error,
});

const clearUnlockError = () => ({
  type: SignInActionTypes.UNLOCK_CRUST_ERROR,
  error: undefined,
});

export const unlockCrustSuccessFalse = () => ({
  type: SignInActionTypes.UNLOCK_CRUST_SUCCESS_FALSE,
});

export const unlockCrust = password => async dispatch => {
  if (password === '') {
    const error = {};
    error.message = 'Password is required.';
    dispatch(unlockCrustError(error));
  } else {
    try {
      dispatch(updateAppLoading(true));
      const ret = await promiseTimeout(
        5000,
        APITypes.OnBoarding.setHashKey(keccak512(password)),
        false,
      );
      if (ret.result === false) {
        throw new Error('Time out.');
      }
      dispatch(clearUnlockError());
      dispatch(unlockCrustSuccess());
    } catch (e) {
      dispatch(updateAppLoading(false));
      const error = {
        message: 'Password is incorrect.',
        stack: e.stack || {},
      };
      dispatch(unlockCrustError(error));
    }
  }
};
