const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const dependencies = require("./package.json").dependencies;

const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

const todoformAppUrl = "http://127.0.0.1:5500/todoform-app/build";
const todolistppUrl = "http://127.0.0.1:5500/todolist-app/build";

module.exports = {
  entry: "./src/bootstrap.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  mode: "production",
  devServer: {
    port: 7001,
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
      name: "host_app",
      filename: "remoteEntry.js",
      remotes: {
        todoform_app: `todoform_app@${todoformAppUrl}/remoteEntry.js`,
        todolist_app: `todolist_app@${todolistppUrl}/remoteEntry.js`,
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