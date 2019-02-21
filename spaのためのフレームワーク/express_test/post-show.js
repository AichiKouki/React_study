//テキストボックスに文字列を入力して送信ボタンを押したらその内容を表示する
// Expressを起動
const express = require('express')
const app = express()
// body-parserを有効にする
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, () => {
  console.log('起動しました - http://localhost:3000')
})
// GETメソッドならWebフォームを表示
app.get('/', (req, res) => {
  res.send('<form method="POST">' +
    '<textarea name="memo">テスト</textarea>' +
    '<br /><input type="submit" value="送信">' +
    '</form>')
})
// POSTメソッドを受け付ける
app.post('/', (req, res) => {
  const s = JSON.stringify(req.body)//req.bodyでPOSTされたフォームの値が取得できる。また、JSON.stringifyでJavaScriptの値をJSON文字列に変換できる
  res.send('POSTを受信: ' + s)
})


