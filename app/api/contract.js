import * as MessageTypes from '../../lib/constants/message-types';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const addToken = async address => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_CONTRACT_ADD,
    address,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const getTokens = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_CONTRACT_GET_TOKEN_LIST,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const updateAllTokenBalance = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_CONTRACT_UPDATE_TOKEN_BALANCES,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
