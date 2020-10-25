const { merge } = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const shared = require("./webpack.common");

module.exports = merge(shared, {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss|css$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle_main.js",
    // hotUpdateChunkFilename: ".hot/[id].hot-update.js",
    // hotUpdateMainFilename: ".hot/.hot-update.json",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
});
