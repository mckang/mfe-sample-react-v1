const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const todoformAppUrl = "http://127.0.0.1:7002";
const todolistppUrl = "http://127.0.0.1:7003";

const devConfig = {
  mode: 'development',
  devServer: {
    port: 7001,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host_app",
      filename: "remoteEntry.js",
      remotes: {
        todoform_app: `todoform_app@${todoformAppUrl}/remoteEntry.js`,
        todolist_app: `todolist_app@${todolistppUrl}/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
