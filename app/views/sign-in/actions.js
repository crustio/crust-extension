import { keccak512 } from 'js-sha3';
import * as APITypes from '../../api';
import * as SignInActionTypes from './action-types';
import * as APIConstants from '../../../lib/constants/api';
import { updateAppLoading } from '../../containers/actions';

const unlockCrustSuccess = () => ({
  type: SignInActionTypes.UNLOCK_CRUST_SUCCESS,
});

const unlockCrustError = error => ({
  type: SignInActionTypes.UNLOCK_CRUST_ERROR,
  error,
});

export const unlockCrust = password => async dispatch => {
  try {
    dispatch(updateAppLoading(true));
    await APITypes.OnBoarding.setHashKey(keccak512(password));
    dispatch(unlockCrustSuccess());
  } catch (e) {
    dispatch(updateAppLoading(false));
    const error = {
      message: e.message,
      stack: e.stack || {},
    };
    switch (e.code) {
      case APIConstants.FAILURE:
        error.message = password !== '' ? 'Password is incorrect.' : 'Password is required.';
        break;
      default:
    }
    dispatch(unlockCrustError(error));
  }
};
