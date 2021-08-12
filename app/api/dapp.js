import * as MessageTypes from '../../lib/constants/message-types';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const updateWhiteListedDApps = async request => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_DAPP_UPDATE_WHITELIST,
    request,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getDAppRequests = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_GET_DAPP_REQUESTS,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const cancelRequest = async request => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_DAPP_CANCEL_REQUEST,
    request,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const signMessage = async (request, password) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_DAPP_GET_SIGN_MESSAGE,
    request,
    password,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const submitTransaction = async (data, request, dApp = false, password) => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_DAPP_TXN_SUBMIT,
    data,
    request,
    dApp,
    password,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const allowMetadataProvide = async request => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_DAPP_ALLOW_METADATA_PROVIDE,
    request,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
