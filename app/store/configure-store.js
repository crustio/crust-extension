import AppConfig from '../../lib/constants/config';

if (AppConfig.isProd) {
  module.exports = require('./configure-store.prod');
} else {
  module.exports = require('./configure-store.dev');
}
