// readfile-sync.jsの内容を無名関数使って短くした
//readFile関数の第三引数をそのまま関数にしただけ

const fs = require('fs')

// ファイルの読み込み
fs.readFile('kakugen.txt', 'utf-8', function (err, data) {
  // 読み込みが完了したときの処理
  console.log(data)
})
