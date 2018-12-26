//webpackの変換指示書となる設定ファイル
//このファイルをwebpack.config.jsという名前で保存しておけば、コマンドラインから「webpack」と入力するだけで変換作業(ファイルを一つにまとめる処理)が行うことができる
module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'src/out/test.js'
  }
};
