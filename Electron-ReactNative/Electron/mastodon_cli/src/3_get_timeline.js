const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const instanceUri = 'https://pawoo.net' //インスタンス指定

// ファイルから情報を読み込む
const token = fs.readFileSync(path.join(__dirname, '../token.json'))//2_auth.jsで生成したアクセストークンのファイルを指定

// マストドンのAPIクライアントを作成
const M = new Mastodon({
  access_token: token, //アクセストークンのファイルを指定
  timeout_ms: 60 * 1000,  //タイムアウトの時間を60秒に設定
  api_url: instanceUri + '/api/v1/'
})

// タイムラインを読む --- (※1)
M.get('timelines/home', {})
 .then(res => {
   const data = res.data
   console.log(data) //タイムライン出力
 })



