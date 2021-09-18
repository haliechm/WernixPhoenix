const webpack = require("webpack");
const path = require('path');
const glob = require('glob');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack4-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = (env, options) => {
  const devMode = options.mode === 'development';
  return {
    mode: "development",
    devtool: "eval-source-map",
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        // new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    entry: {
      'app': glob.sync('./vendor/**/*.js').concat(['./js/index.js']),
      // 'marketing': glob.sync('./vendor/**/*.js').concat(['./js/marketing.js']),
      // 'admin': glob.sync('./vendor/**/*.js').concat(['./js/admin.js']),
      // 'shared': 'lodash'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../priv/static/js'),
      publicPath: './js/'
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.[s]?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        { test: /\.(png|jpg|pdf)$/, use: 'url-loader?limit=15000' },
        {
          test: /\.svg$/,
          loader:
            'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
        },
        {
          test: /\.woff$/,
          loader:
            'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'
        },
        {
          test: /\.woff2$/,
          loader:
            'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
        },
        {
          test: /\.[ot]tf$/,
          loader:
            'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
        },
        {
          test: /\.eot$/,
          loader:
            'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
        }
      ]
    },
    performance: {
      hints: "warning"
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '../css/[name].css' }),
      new CopyWebpackPlugin([{ from: 'static/', to: '../' }]),
      new OpenBrowserPlugin({ url: "http://localhost:4000" })
      // new webpack.ProvidePlugin({
      //   // lodash plugin imports
      //   _map: ['lodash', 'map'],
      //   _find: ['lodash', 'find'],
      //   _filter: ['lodash', 'filter'],
      //   _isEqual: ['lodash', 'isEqual'],
      //   _chain: ['lodash', 'chain'],
      //   _some: ['lodash', 'some'],
      //   _every: ['lodash', 'every'],
      //   _includes: ['lodash', 'includes'],
      // })
    ]
    // .concat(devMode ? [new HardSourceWebpackPlugin()] : [])
  }
};