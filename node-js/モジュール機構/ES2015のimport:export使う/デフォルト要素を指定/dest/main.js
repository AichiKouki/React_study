'use strict';

var _kakezan = require('./kakezan');

var _kakezan2 = _interopRequireDefault(_kakezan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// kakezan関数を利用
var v = (0, _kakezan2.default)(2, 3); //デフォルト要素を指定した方法
//kakezan.jsで関数が一つしかないので、以下のようにそのまま簡単に使える

// kakezanモジュールを取り込む

console.log(v);