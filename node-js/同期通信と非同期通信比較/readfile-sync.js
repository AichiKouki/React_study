//同期処理と非同期処理の使い勝手を比較してみる
//それぞれテキストファイルを読み込んでコンソールに表示している

const fs = require('fs')

// --- 同期的にファイルを読み込む --- (※1)
const data = fs.readFileSync('kakugen.txt', 'utf-8')
console.log(data)

// --- 非同期でファイルを読み込む --- (※2)
//テキストファイルの読み込みが終わったらreadHandler関数を呼び出す仕組み
fs.readFile('kakugen.txt', 'utf-8', readHandler) 
// 読み込みが完了したときの処理
function readHandler (err, data) {
  console.log(data)
}
