const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp('src'), // source
  appHtml: resolveApp('src/index.html'),
  appIndex: resolveApp('src/index.ts'), // Main entry point
  appAssets: resolveApp('dist'), // For images and other assets
  appPublic: resolveApp('dist'), // Prod built files end up here
  appConfig: resolveApp('config'), // App config files
};
