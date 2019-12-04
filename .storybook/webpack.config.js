const projectConfig = require('../webpack.config');

module.exports = ({ config }) => {
  config.module.rules.push(...projectConfig.module.rules);
  config.resolve.extensions.push(...projectConfig.resolve.extensions);

  return config;
};
