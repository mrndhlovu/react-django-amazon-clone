const { merge } = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const shared = require("./webpack.common");

module.exports = merge(shared, {
  mode: "production",
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
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
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  output: {
    filename: "main.[hash].js",
    hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: ".hot/[hash].hot-update.json",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
  ],
  externals: {
    config: JSON.stringify({
      apiUrl: "/v1/api",
    }),
  },
});
