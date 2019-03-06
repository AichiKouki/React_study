//webpackの変換指示書となる設定ファイル
//このファイルをwebpack.config.jsという名前で保存しておけば、コマンドラインから「webpack」と入力するだけで変換作業(ファイルを一つにまとめる処理)が行うことができる
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production', // 追加
  entry: './src/index.js',
  output: {
    filename: './src/out/bundle2.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets:['@babel/env', '@babel/react']
        }
      }
    ]
  }
};
