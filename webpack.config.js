require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    port: 9000,
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Web Components Playground",
      template: "src/index.html",
      templateParameters: {
        apiKey: process.env.APIKEY,
      },
    }),
  ],
};
