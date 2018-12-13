"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.mul = mul;
//ES2015のimport/export

// 外部に公開する関数を定義
//functionの前にexportを記述することによって、その関数を外部に公開することを宣言
function add(a, b) {
  return a + b;
}
function mul(a, b) {
  return a * b;
}