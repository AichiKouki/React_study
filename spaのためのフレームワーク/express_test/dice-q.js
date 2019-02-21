//URLパラメータのクエリー文字列を取得する。
//URLに「?key1=value1&key2=value2・・・」って感じでアクセスしたら、「req.query.key1」って感じで値を取得できる
const express = require('express')
const app = express()
const portNo = 3000

// ルートへのアクセス
app.get('/', (req, res) => {
  if (!req.query.q) {//「?q=6」みたいな指定がなかったら
    res.send(
      '<p><a href="?q=6">6面体のサイコロ</a><br />' +
      '<a href="?q=12">12面体のサイコロ</a></p>')
  } else {
    const q = parseInt(req.query.q, 10)//「req.query.パラメータ名」で取得。「?q=5」のqの値をint型に変換。第二引数は基数で、10進数を指定している
    res.send(
      '今回の値は...' + dice(q))
  }
})

function dice(n) {
  return Math.floor(Math.random() * n) + 1
}

app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})



