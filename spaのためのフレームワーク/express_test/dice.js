// Expressのモジュールを取り込んで生成
const express = require('express')
const app = express()
const portNo = 3000

// URLに応じた処理を行う
// ルートへのアクセス
app.get('/', (req, res) => {//ルートにアクセスしたらこの処理
  res.send(
    '<p><a href="/dice/6">6面体のサイコロ</a><br />' +
    '<a href="/dice/12">12面体のサイコロ</a></p>')
})
// サイコロへのアクセス
app.get('/dice/6', (req, res) => {//「dice/6」ってアクセスしたら6面体の処理がされる
  res.send('今回の値は...' + dice(6))//res.sendメソッドでその内容を表示する
})
app.get('/dice/12', (req, res) => {
  res.send('今回の値は...' + dice(12))
})
function dice(n) {
  return Math.floor(Math.random() * n) + 1
}

// 待ち受ける
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})



