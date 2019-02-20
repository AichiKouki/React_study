//このプログラムを実行すると、指定のインスタンスにアプリを申請します。API側では「client_id」と「client_secret」の情報を返ってくるので、cli-app.jsonというファイルに保存する
//マストドンでは、アプリの登録も、API経由でできてしまう。
// Web API経由でアプリをサーバーに登録する
const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')

const instanceUri = 'https://pawoo.net'
const clientName = 'MasdonCli'
const savefile = path.join(__dirname, 'cli-app.json')

// Web APIを呼びだす
Mastodon.createOAuthApp(instanceUri+'/api/v1/apps', clientName)
  .catch(err => console.error(err))
  .then(res => {
    console.log(res)
    fs.writeFileSync(savefile, JSON.stringify(res))
  })

/*
以下のような、結果が返ってくる
{ id: '〜〜〜〜〜',
  name: 'MasdonCli',
  website: null,
  redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
  client_id〜〜
*/
