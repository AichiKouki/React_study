//ECC2017では、PromiseやGeneratorを使ったプログラムをより簡潔に記述するために、
//「async/await」が追加された。Node v7以降でサポートされている
const fs = require('fs')

// Promiseで非同期でファイルを読み込む関数を定義
//ここは、普通にPromise使う時と同じ
function readFileEx (fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(fname, 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}

// 全てのファイルを逐次読むasync関数を定義
//通常のPromiseを使った方法では、then()メソッドの中に関数作ったりする必要があった
async function readAll () { //awaitを使う関数は、async functionとして定義する必要がある
  const a = await readFileEx('a.txt')//非同期処理の実行を待機したい場合は、「await 関数名」
  console.log(a)
  const b = await readFileEx('b.txt')
  console.log(b)
  const c = await readFileEx('c.txt')
  console.log(c)
}

readAll()

