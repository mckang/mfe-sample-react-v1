const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/todoform/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "todoform_app",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoForm": "./src/components/todoform.jsx",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
