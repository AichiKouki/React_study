//generatorはjavascriptの軽量版のコルーチン。yieldキーワードを使って関数を一時停止したり、再開したりできます。generator関数はfunction* ()という特殊な構文を使います。その威力をもってすれば、prom iseや「サンク」を使った非同期処理を一時停止したり、再開したりすることもできるのです。 つまり”同期風”の非同期コードが書けるというわけですね。

// Generator関数を定義 --- (※1)
//通常の関数定義と違って、「*」が付いています
function * counter () {
  yield 1
  yield 2
  yield 3
}
// Generatorオブジェクトを作成 --- (※2)
const g = counter()//関数呼び出しを行うと、Generatorオブジェクトを取得できる

// next()メソッドを呼ぶ --- (※3)
/*
nextメソッドを呼び出すと、まずはGenerator関数の先頭からyieldまでの部分が実行されます。
そして、next()を呼び出した側には、yieldの値(value)と、関数に続きがあるかどうかの情報(done)という二つの情報が返されます。
さらにnext()を呼び出すと、先ほど停止したyieldから次のyieldまでの部分が実行されます。
繰り返しnext()を呼び、最終的にGenerator関数の終端まで来るとdoneの値がtrueとなる仕組み
*/
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
