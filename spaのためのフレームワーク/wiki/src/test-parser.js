// パーサを取り込む
const WikiParser = require('./wiki_parser.js')
// ソースコードをパース
const src = '*title\n\n-list1\n-list2\n\nhoge'
const nodes = WikiParser.parse(src)
console.log(nodes)


