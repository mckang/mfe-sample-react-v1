const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const dependencies = require("./package.json").dependencies;
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  entry: "./src/bootstrap.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  mode: "development",
  devServer: {
    port: 7003,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "todolist_app",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoList": "./src/components/todolist.jsx",
      },
      shared: {
        "react": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies["react-router-dom"],
        },      
        "react-hot-toast": {
          singleton: true,
          eager: true,
          requiredVersion: dependencies["react-hot-toast"],
        },         
      },
      // shared: {
      //   ...dependencies,
      // },
    }),     
  ],
};