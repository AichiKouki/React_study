//コールバック地獄を「Promise」で解決
//本来非同期によって得られる値の代わりに、Promiseオブジェクトを返しておいて、処理が完了した時点で、実際の値が得られるという仕組み
const fs = require('fs')

// Promiseを返す関数を定義 --- (※1)
//Promiseを利用する場合は、最初にPromiseオブジェクトを返す関数を用意しなきゃいけない
function readFile_pr (fname) {
  return new Promise((resolve) => {
    fs.readFile(fname, 'utf-8', (err, s) => {
      resolve(s)//resolveメソッドを呼ぶことで成功を示しthenメソッドの引数の処理を実行してる
    })
  })
}

// 順にテキストファイルを読む --- (※2)
//非同期処理が完了(resolveメソッドが呼ばれる)たびに、then()メソッドの中に書いた関数が呼ばれるようになる
readFile_pr('a.txt')
.then((text) => {
  console.log('a.txtを読みました', text)
  return readFile_pr('b.txt')//2回目の非同期処理
})
.then((text) => {
  console.log('b.txtを読みました', text)
  return readFile_pr('c.txt')//3回目の非同期処理
})
.then((text) => {
  console.log('c.txtを読みました', text)
})