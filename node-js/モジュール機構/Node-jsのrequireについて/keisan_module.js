//Node.jsのモジュール機構について
/*
ライブラリとして定義するモジュール側ではmodule.exportsという変数を定義して、そこに公開したいオブジェクトを指定する。
ライブラリを使う側では、require()を利用してモジュールを定義したオブジェクトを取り込む
*/

//このファイルはライブラリを定義する側。使う側は「keisan_main.js」

// 足し算と掛け算の関数
function add (a, b) {
  return a + b
}
function mul (a, b) {
  return a * b
}

// 外部に公開する
//ライブラリとして公開したいオブジェクトを指定
module.exports = {
  'add': add,
  'mul': mul
}
