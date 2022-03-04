const extension = require('extensionizer');

const WINDOW_HEIGHT = 600;
const WINDOW_WIDTH = 360;

export function create(tabId) {
  const { create } = extension.windows;
  const { width } = window.screen;
  const windowTop = 100;
  const windowLeft = Math.round(width / 2 - WINDOW_WIDTH / 2);
  const option = {
    url: 'window.html',
    type: 'popup',
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    top: Math.max(windowTop, 0),
    left: Math.max(windowLeft, 0),
  };
  if (tabId) {
    option.tabId = tabId;
  }
  return new Promise((resolve, reject) => {
    try {
      create(option, details => {
        resolve(details);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function remove(id) {
  const { remove } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      remove(id, () => {
        resolve(1);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function get(id) {
  const { get } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      get(id, res => {
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function getAll() {
  const { getAll } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      getAll({}, windows => {
        resolve(windows);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function update(id) {
  const { update } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      update(id, { focused: true }, result => {
        resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
}
