import { runtime } from 'extensionizer';
import {
  SENDER_CRUST_BG,
  SYNC_NETWORK_CONNECTED,
  SYNC_NETWORK_ERROR,
  SYNC_NETWORK_LOADING,
} from '../../app/services/types-for-watch-bg';

export function sendMsg(data) {
  runtime.sendMessage({
    ...data,
    sender: SENDER_CRUST_BG,
  });
}

export function syncNetworkConnected(isConnected) {
  sendMsg({
    type: SYNC_NETWORK_CONNECTED,
    isConnected,
  });
}

export function syncNetworkError(isError, isErrorByType) {
  sendMsg({
    type: SYNC_NETWORK_ERROR,
    isError,
    isErrorByType,
  });
}

export function syncNetworkLoading(isLoading) {
  sendMsg({
    type: SYNC_NETWORK_LOADING,
    isLoading,
  });
}
