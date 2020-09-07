/* eslint-disable prefer-destructuring */
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
// .BundleAnalyzerPlugin;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const shared = require("./webpack.common");

module.exports = merge(shared, {
  mode: "development",
  output: {
    filename: "[name].js",
    hotUpdateChunkFilename: ".hot/[id].hot-update.js",
    hotUpdateMainFilename: ".hot/.hot-update.json",
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    // new BundleAnalyzerPlugin(),
  ],
  externals: {
    config: JSON.stringify({
      apiUrl: "http://localhost:5000",
    }),
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
});
