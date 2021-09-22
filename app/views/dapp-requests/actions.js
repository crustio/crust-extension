import { cancelRequest } from '../../api/dapp';
import * as RequestType from '../../../lib/constants/request-types';
import * as DAppService from '../../services/dapp-service';
import { onBoard } from '../../actions/initialize';
import { setNetwork } from '../../actions/network';
import { verifyPassword } from '../../api/account';

export const cancelDAppRequest = request => async dispatch => {
  await cancelRequest(request);
  dispatch(onBoard());
};

export const allowRequest = (request, password) => async dispatch => {
  try {
    switch (request.request.requestType) {
      case RequestType.SEND:
        await verifyPassword(password);
        await DAppService.submitTransaction(request, password);
        break;
      case RequestType.SIGN_MESSAGE:
        await verifyPassword(password);
        await DAppService.signMessage(request, password);
        break;
      case RequestType.GET_METADATA_PROVIDE:
        await DAppService.allowMetadataProvide(request);
        break;
      default:
    }
  } catch (err) {
    if (err.message === 'Password is incorrect.') {
      return err.message;
    }
  }

  dispatch(onBoard());
};

export const fetchNetwork = () => async dispatch => {
  await dispatch(setNetwork);
};
