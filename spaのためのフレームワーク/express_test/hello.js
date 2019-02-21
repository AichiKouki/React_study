// Expressのモジュールを取り込んでオブジェクトを生成 --- (※1)
const express = require('express')
const app = express()
const portNo = 3000

// アクセスがあった時にどのような処理をするかを指定する --- (※2)
app.get('/', (req, res, next) => {//この場合、リクエストが「/」(ルート)に会った時の処理を関数オブジェクトで指定
  res.send('Hello World!') //res.sendメソッドで、この内容を表示する
})

// サーバを起動 --- (※3)
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})
