// 自作の計算モジュール「calctest.js」を取り込む
import {add, mul} from './calctest.js' //add関数とmul関数を指定

//指定したファイル(モジュール)のすべての要素を取り込む場合は、
//import * as ct from './calctest.js'; って感じで「*」は全部で、ctは勝手につけた名前で、「ct.add()」って感じでアクセスできるようになる

// 取り込んだ関数を利用する
console.log(add(2, 3))
console.log(mul(6, 8))
