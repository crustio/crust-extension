import { FAILURE } from '../../lib/constants/api';

let initMessageId = 100;
const MSG = {};

function createMessageId() {
  if (initMessageId < 10000000) {
    initMessageId += 1;
  } else {
    initMessageId = 100;
  }
  return initMessageId;
}

export function resolveRequest(requestType, opts, metadata) {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    try {
      const messageId = createMessageId();
      const data = {
        requestType,
        opts,
        metadata,
        messageId,
      };
      const onMessage = event => {
        // We only accept messages from ourselves
        if (event.source !== window) return;
        const msgId = event.data && event.data.msgId ? event.data.msgId : 1;
        const msg = MSG[msgId];
        if (msgId > 100 && msg) {
          const {
            data: { result, status, message },
          } = event;
          if (status === FAILURE) {
            reject(message);
          } else {
            resolve(result);
          }
          window.removeEventListener('message', msg.onMessage);
          delete MSG[msgId];
        }
      };
      if (MSG[messageId]) {
        window.removeEventListener('message', MSG[messageId].onMessage);
      }
      MSG[messageId] = { ...data, onMessage };
      window.addEventListener('message', onMessage);
      window.postMessage(data, location.href);
    } catch (e) {
      const error = {
        message: e.message,
        stack: e.stack || {},
      };
      reject(error);
    }
  });
}
