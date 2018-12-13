/*
ライブラリとして定義するモジュール側ではmodule.exportsという変数を定義して、そこに公開したいオブジェクトを指定する。
ライブラリを使う側では、require()を利用してモジュールを定義したオブジェクトを取り込む
*/

//このファイルはライブラリを読み込む側。ライブラリを定義しているファイルは「keisan_module.js」

// モジュールを取り込む
const keisan = require('./keisan_module.js')

// モジュールの関数を使う
console.log('3+5=', keisan.add(3, 5))//keisan_module.hsのadd関数を呼び出しているだけ
console.log('4*8=', keisan.mul(4, 8))
