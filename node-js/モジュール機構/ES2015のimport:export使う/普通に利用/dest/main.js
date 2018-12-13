'use strict';

var _calctest = require('./calctest.js');

//add関数とmul関数を指定

//指定したファイル(モジュール)のすべての要素を取り込む場合は、
//import * as ct from './calctest.js'; って感じで「*」は全部で、ctは勝手につけた名前で、「ct.add()」って感じでアクセスできるようになる

// 取り込んだ関数を利用する
console.log((0, _calctest.add)(2, 3)); // 自作の計算モジュール「calctest.js」を取り込む

console.log((0, _calctest.mul)(6, 8));