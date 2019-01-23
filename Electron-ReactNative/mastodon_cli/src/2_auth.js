const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync')
const file_cli_app = path.join(__dirname, 'cli-app.json') //1_create/app.jsにで生成されたjsonファイルを指定
const file_user = path.join(__dirname, 'token.json') //アクセストークンが取得されたらこのファイル名で保存
const instanceUri = 'https://pawoo.net' //インスタンスを指定(p226に一覧がある)

// ファイルからクライアント情報を読み込む
const info = JSON.parse(fs.readFileSync(file_cli_app))

// 認証用URLを取得する
Mastodon.getAuthorizationUrl(
    info.client_id,
    info.client_secret,
    instanceUri)
  .then(url => {
    console.log("以下のURLにアクセスしてコードを取得してください。")
    console.log(url)//認証用のURLを表示。このURLをWebブラウザに入力
    // コマンドラインからコードを取得
    const code = readlineSync.question('コード: ') //質問の表示と入力した値を取得
    // アクセストークンを取得する
    return Mastodon.getAccessToken(
      info.client_id,
      info.client_secret,
      code,
      instanceUri)
  })
  .then(token => {
    console.log('アクセストークン: ', token)
    fs.writeFileSync(file_user, token) //アクセストークンが取得されたら、このファイル名で保存
  })



