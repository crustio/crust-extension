import * as MessageTypes from '../../lib/constants/message-types';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const getTokens = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_CRUST_GET_TOKEN_LIST,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const updateCandyBalance = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_CRUST_UPDATE_CANDY_BALANCE,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
