// --------------------------------------------------------
// リアルタイムチャットのサーバ
// --------------------------------------------------------

// HTTPサーバを作成(アプリを送信するため) --- (※1)
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
server.listen(portNo, () => {
  console.log('起動しました', 'http://localhost:' + portNo)
})
// publicディレクトリのファイルを自動で返す --- (※2)
app.use('/public', express.static('./public'))
app.get('/', (req, res) => { // ルートへのアクセスを/publicへ。
  res.redirect(302, '/public')
})

// WebSocketサーバを起動 --- (※3)
const socketio = require('socket.io')
const io = socketio.listen(server)
// クライアントが接続したときのイベントを設定 --- (※4)
io.on('connection', (socket) => {
  console.log('ユーザが接続:', socket.client.id)
  // メッセージ受信時の処理を記述 --- (※5)
  socket.on('chat-msg', (msg) => {//chat-msgという種類のメッセージを受信した時の処理を記述。なお、このメッセージの種類は自分で定義可能。msgは取得したデータ
    console.log('メッセージ', msg)
    // 全てのクライアントに送信 --- (※6)
    io.emit('chat-msg', msg)//io.emit(メッセージの種類,データ)メソッドを使っている。このメソッドを呼ぶと、全てのクライアントに一斉送信ができる
  })
})

