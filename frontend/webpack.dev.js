// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s(a|c)ss|css$/,
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
    // new BundleAnalyzerPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
});
