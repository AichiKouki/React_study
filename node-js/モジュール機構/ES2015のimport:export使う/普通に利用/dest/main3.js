'use strict';

var _calctest = require('./calctest.js');

// モジュールの関数を使う
console.log((0, _calctest.add)(2, 3)); //モジュールを取り込むとき、別名をつけて取り込む例。
//main.jsとmain2.jsでは、import文の内容が違うだけ

// モジュールを取り込む

console.log((0, _calctest.mul)(6, 8));