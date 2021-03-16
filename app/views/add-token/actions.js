import { createToast } from '../../constants/toast';
import { Contract } from '../../api';

export const addToken = address => async dispatch => {
  try {
    const { result } = await Contract.addToken(address);
    return result;
  } catch (e) {
    dispatch(createToast({ message: 'Error add token', type: 'error' }));
    return undefined;
  }
};
