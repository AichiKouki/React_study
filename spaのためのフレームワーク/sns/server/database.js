// データベースに関する処理をまとめたもの
const path = require('path')
const NeDB = require('nedb')

// データベースに接続する --- (※1)
const userDB = new NeDB({//ユーザー情報用のデータベース
  filename: path.join(__dirname, 'user.db'),
  autoload: true
})
const timelineDB = new NeDB({//タイムライン用のデータベース
  filename: path.join(__dirname, 'timeline.db'),
  autoload: true
})

// ハッシュ値(sha512)を取得 --- (※2)
function getHash (pw) {//パスワードのハッシュ値を求める関数を定義
  const salt = '::EVuCM0QwfI48Krpr'
  const crypto = require('crypto')
  const hashsum = crypto.createHash('sha512')//ハッシュ関数のひとつ
  hashsum.update(pw + salt)//パスワードに「salt」変数での文字列を連結させて、データベースが流出しても類推できないように工夫した
  return hashsum.digest('hex')
}
// 認証用のトークンを生成 --- (※3)
function getAuthToken (userid) {//useridを元にして認証用トークンを生成。毎回異なるものにしたいので、時間を元に生成
  const time = (new Date()).getTime()
  return getHash(`${userid}:${time}`)
}

// 以下APIで利用するDBの操作メソッド --- (※4)
// ユーザの検索。DBからユーザー情報を全て返す
function getUser (userid, callback) {
  userDB.findOne({userid}, (err, user) => {
    if (err || user === null) return callback(null)
    callback(user)
  })
}
// ユーザの新規追加 --- (※5)
function addUser (userid, passwd, callback) {
  const hash = getHash(passwd)//生のパスワードを保存するのはリスクが高いので、パスワードを元に計算したハッシュ値を保存(※2)の関数
  const token = getAuthToken(userid)
  const regDoc = {userid, hash, token, friends: {}}
  userDB.insert(regDoc, (err, newdoc) => {
    if (err) return callback(null)
    callback(token)
  })
}
// ログインの試行 --- (※6)
//「(※5)で保存したハッシュ値」と「ユーザーが送信したパスワードから得たパスワード」が同じなら、ログインを成功とみなして、認証用トークンを返す
function login (userid, passwd, callback) {
  const hash = getHash(passwd)
  const token = getAuthToken(userid)
  // ユーザ情報を取得
  getUser(userid, (user) => {
    if (!user || user.hash !== hash) {
      return callback(new Error('認証エラー'), null)
    }
    // 認証トークンを更新。毎回異なるトークンにする必要があるから
    user.token = token
    updateUser(user, (err) => {
      if (err) return callback(err, null)
      callback(null, token)
    })
  })
}
// 認証トークンの確認 --- (※7)
//サーバー側で、ログインした後の何かしらの処理をするたびにここを処理する。これで毎回パスワードを入力する必要がなくなる
function checkToken (userid, token, callback) {
  // ユーザ情報を取得
  getUser(userid, (user) => {
    if (!user || user.token !== token) {
      return callback(new Error('認証に失敗'), null)
    }
    callback(null, user)
  })
}
// ユーザ情報を更新 --- (※7)
//サーバー側で、友達追加するときの処理の中で呼ばれる
function updateUser (user, callback) {
  userDB.update({userid: user.userid}, user, {}, (err, n) => {
    if (err) return callback(err, null)
    callback(null)
  })
}
// 友達のタイムラインを取得する --- (※9)
function getFriendsTimeline (userid, token, callback) {
  checkToken(userid, token, (err, user) => {
    if (err) return callback(new Error('認証に失敗'), null)
    // 友達の一覧を取得
    const friends = []
    for (const f in user.friends) friends.push(f)
    friends.push(userid) // 友達＋自分のタイムラインを表示
    // 友達のタイムラインを最大20件取得
    timelineDB
      .find({userid: {$in: friends}})
      .sort({time: -1})
      .limit(20)
      .exec((err, docs) => {
        if (err) {
          callback(new Error('DBエラー'), null)
          return
        }
        callback(null, docs)
      })
  })
}
module.exports = {
  userDB, timelineDB, getUser, addUser, login, checkToken, updateUser, getFriendsTimeline
}

