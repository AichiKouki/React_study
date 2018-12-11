//アロー関数とは　その名の通り、　=>(矢)を使って関数リテラルを記述します。
//アロー関数は、無名関数をより簡潔に書くための記述法

const fs = require('fs')

fs.readFile('kakugen.txt', 'utf-8', (err, data) => {//無名関数の場合はfunction(err,data)
  console.log(data)
})

/*
上記のプログラムだけじゃメリットが分かりにくいが、以下のようなメリットがある

本体が一文である場合、ブロックを表す{...}を省略できます。
また、文の戻り値がそのまま戻り値とみなされるので、return命令も省略できます。

let getTriangle = (base, height) => base * height / 2;
console.log(getTriangle(10,2));//10
*/