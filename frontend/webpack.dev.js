const { SourceMapDevToolPlugin } = require("webpack");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
const shared = require("./webpack.common");

module.exports = merge(shared, {
  mode: "development",
  output: {
    filename: "[name].js",
     path.join(__dirname, "build"),
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
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
});
