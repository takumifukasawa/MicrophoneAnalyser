const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// TODO: fix for assets
// common.plugins.push(new CleanWebpackPlugin());

module.exports = merge(common, {
  mode: 'production',
});
