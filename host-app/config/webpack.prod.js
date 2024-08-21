const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// const domain = process.env.PRODUCTION_DOMAIN;
const todoformAppUrl = "http://127.0.0.1:7002";
const todolistppUrl = "http://127.0.0.1:7003";

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host_app",
      remotes: {
        todoform_app: `todoform_app@${todoformAppUrl}/remoteEntry.js`,
        todolist_app: `todolist_app@${todolistppUrl}/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
