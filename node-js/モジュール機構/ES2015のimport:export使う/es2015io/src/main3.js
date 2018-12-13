//モジュールを取り込むとき、別名をつけて取り込む例。
//main.jsとmain2.jsでは、import文の内容が違うだけ

// モジュールを取り込む
import {add as addF, mul as mulF} from './calctest.js'

// モジュールの関数を使う
console.log(addF(2, 3))
console.log(mulF(6, 8))
