const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const readConfig = require('read-config');

const constants = readConfig('./constants.yml');

const {
  DEST,
  BASE_DIR
} = constants;

// base config
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: HOST,
    port: PORT,
    contentBase: DEST,
    openPage: path.relative('/', BASE_DIR),
  },
});