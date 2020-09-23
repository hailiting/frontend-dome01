const { merge } = require("webpack-merge");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const { join } = require("path");

const LiveReloadPlugin = require("webpack-livereload-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const del = require("del");

del(["dist"]);
const mode = argv.mode || "development";
const _modeflag = mode === "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${mode}.js`);

let _entry = {}; // 需要处理的入口文件
let _plugins = []; // 插件系统

const files = glob.sync("./src/webapp/views/**/*.entry.ts");
const HtmlAfterWebpackPlugin = require("./config/htmlAfterWebpackPlugin");

for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.ts)$/g.test(item)) {
    const entryKey = RegExp.$1;
    _entry[entryKey] = item;
    const [dist, template] = entryKey.split("-");
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        template: `src/webapp/views/${dist}/pages/${template}.html`,
        inject: false,
        chunks: ["runtime", "commons", entryKey],
        minify: {
          collapseWhitespace: _modeflag,
          removeComments: _modeflag,
        },
      })
    );
  }
}

let cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
  },
  {
    loader: "postcss-loader",
  },
];
// 开发环境
!_modeflag && cssLoaders.unshift("css-hot-loader");
const webpackConfig = {
  entry: _entry,
  watch: !_modeflag,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
    ],
  },
  output: {
    path: join(__dirname, "./dist/assets"),
    publicPath: "/",
    filename: "scripts/[name].bundle.js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "commons",
          minChunks: 3,
          minSize: 0,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  plugins: [
    ..._plugins,
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
    }),
    new ManifestPlugin(),
    new LiveReloadPlugin(),
    new HtmlAfterWebpackPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".css"],
  },
};
module.exports = merge(webpackConfig, _mergeConfig);
