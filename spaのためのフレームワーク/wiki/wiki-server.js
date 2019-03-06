// --------------------------------------------------------
// WikiのWebサーバ
// --------------------------------------------------------
// データベースに接続 --- (※1)
const path = require('path')
const NeDB = require('nedb')
const db = new NeDB({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
})

// WEBサーバを起動 --- (※2)
const express = require('express')
const app = express()
const portNo = 3001
// body-parserを有効にする(body-parserはPOSTされるデータを取得するのに必要なライブラリ)
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

// APIの定義
// Wikiデータを返すAPI --- (※3)
app.get('/api/get/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  db.find({name: wikiname}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err})
      return
    }
    if (docs.length === 0) {
      docs = [{name: wikiname, body: ''}]
    }
    res.json({status: true, data: docs[0]})
  })
})

// Wikiデータを書き込むAPI --- (※4)
app.post('/api/put/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  console.log('/api/put/' + wikiname, req.body)
  // 既存のエントリがあるか確認
  db.find({'name': wikiname}, (err, docs) => {//「:wikiname」の部分は変数みたいになっていて、任意の値が入ってるので、それを利用して識別する
    if (err) {
      res.json({status: false, msg: err})
      return
    }
    const body = req.body.body
    if (docs.length === 0) { // エントリがなければ挿入。つまり指定された種類の投稿が見つからなかったら新規投稿となる(insertメソッド使ってるから)
      db.insert({name: wikiname, body})
    } else { // 既存のエントリを更新。つまり指定された種類の投稿が見つかれば、それは編集となる(updateメソッド使ってるから)
      db.update({name: wikiname}, {name: wikiname, body})
    }
    res.json({status: true})
  })
})

// publicディレクトリを自動で返す --- (※5)
app.use('/wiki/:wikiname', express.static('./public'))
app.use('/edit/:wikiname', express.static('./public'))
app.get('/', (req, res) => {//ルートにアクセスされたら、リダイレクトさせる。
  res.redirect(302, '/wiki/FrontPage')
})

