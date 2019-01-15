//特定のURLにあるファイルをGETメソッドで取得

// 機能を取り込み --- (※1)
const request = require('superagent')//require()で、superagentのライブラリを読み込み

// 指定のURLからデータを取得する --- (※2)
const URL = 'http://localhost:3000/fruits.json'
//Webサーバーにリクエストを送信している。ちなみに、また、メソッドチェーンで連続的に処理を行なっている。
request.get(URL)
       .end(callbackGet)

// データを取得した時の処理 --- (※3)
function callbackGet (err, res) {//errはエラー情報が得られて、resはサーバーから得られた情報を得られる。resはオブジェクトであり、ヘッダー情報やその他の情報を含んでいる.。res.bodyとかで参照できる
  if (err) {
    // 取得できなかった時の処理
    return
  }
  // ここで取得したときの処理
  console.log(res.body)
}

