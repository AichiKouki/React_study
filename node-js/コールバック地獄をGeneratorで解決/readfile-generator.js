//コールバック地獄を、Generatorで解決
/*
基本的な考えとしては、逐次実行させたい非同期処理をGenerator関数として記述して、
yieldで非同期処理が終わるのを待って、関数の続きを実行するという流れ
*/
const fs = require('fs')

// 非同期処理の完了を待って関数の続きを呼ぶ関数
function read_gfn (g, fname) {
  fs.readFile(fname, 'utf-8', (err, data) => {
    g.next(data)
  })
}

// 無名関数として定義したGenerator関数を定義する
//Generator関数を呼び出すたびに、yieldから次のyieldまでが実行される
const g = (function * () {
  const a = yield read_gfn(g, 'a.txt')
  console.log(a)
  const b = yield read_gfn(g, 'b.txt')
  console.log(b)
  const c = yield read_gfn(g, 'c.txt')
  console.log(c)
})()
g.next()
/*
●最初に、無名関数として定義したGenerator関数を定義する
●次に、gにGeneratorオブジェクトを得る。
●このオブジェクトは、next()を呼ぶたびに、次のyieldまでの部分を実行する
●関数をyieldをつけて呼ぶことで、非同期処理が完了してからyieldの次の部分を実行するようになる
*/
