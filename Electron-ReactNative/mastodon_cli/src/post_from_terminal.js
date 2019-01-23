const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const instanceUri = 'https://pawoo.net'
const readlineSync = require('readline-sync')


// ファイルから情報を読み込む
const token = fs.readFileSync(path.join(__dirname, '../token.json'))

// マストドンのAPIクライアントを作成
const M = new Mastodon({
  access_token: token,
  timeout_ms: 60 * 1000, 
  api_url: instanceUri + '/api/v1/'
})

// コマンドラインから書き込みたい文字を入力
const sentence = readlineSync.question('書き込みたい文章を入力してね: ') //質問の表示と入力した値を取得

// 発言(Toot)する 
M.post('statuses',  //3_get_timelineと違う点はここから。
  {status: sentence}, //「TEST TEST TEST TEST by cli」が書き込み内容
  (err, data, res) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(res)
  })


