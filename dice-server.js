//アクセスするURLによって表示内容を変える
//「/dice/6」とアクセスすれば、6面体のサイコロをエミュレートして、「/dice/12」なら12面体のサイコロをエミュレートする。また、ルートや/index.htmlなら6面体、12面体のサイコロへのリンクを表示するようにする

// httpモジュールを読み込む
const http = require('http')
const ctype = { 'Content-Type': 'text/html;charset=utf-8' }

// Webサーバーを実行 --- (※1)
const svr = http.createServer(handler) // サーバーを生成
svr.listen(8081) // ポート8081番で待ち受け開始

// サーバーにアクセスがあった時の処理 --- (※2)
function handler (req, res) {
  // URLの判断
  const url = req.url
  // トップページか？
  if (url === '/' || url === '/index.html') {
    showIndexPage(req, res)
    return
  }
  // サイコロページか？
  if (url.substr(0, 6) === '/dice/') {//「/dice/12」で、0文字目から6文字の間の文字列と比較
    showDicePage(req, res)
    return
  }
  // その他
  res.writeHead(404, ctype)
  res.end('404 not found')
}

// インデックスページにアクセスがあったとき --- (※3)
function showIndexPage (req, res) {
  // HTTPヘッダを出力
  res.writeHead(200, ctype)
  // レスポンスの本体を出力
  const html = '<h1>サイコロページの案内</h1>\n' +
    '<p><a href="/dice/6">6面体サイコロ</a></p>' +
    '<p><a href="/dice/12">12面体サイコロ</a></p>'
  res.end(html)
}

// サイコロページにアクセスがあったとき --- (※4)
function showDicePage (req, res) {
  // HTTPヘッダを出力
  res.writeHead(200, ctype)
  // 何面体のサイコロが必要？
  const a = req.url.split('/') //リクエストされたURLを「/」で区切ってそれぞれ配列に保存
  const num = parseInt(a[2])//「/dice/6」で配列の2番目は当然数字の部分で6となる
  // 乱数を生成
  const rnd = Math.floor(Math.random() * num) + 1 //ユーザーが指定した数字の間で乱数生成
  // レスポンスの本体を出力
  res.end('<p style="font-size:72px;">' + rnd + '</p>'+'<br>'+'リクエストされたURLは、'+req.url)
}
