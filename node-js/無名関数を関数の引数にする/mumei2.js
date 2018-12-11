//無名関数を関数の引数にする

// 小文字を大文字に変換する例
const s = 'Keep On Asking, and It Will Be Given You.'
const r = s.replace(/[a-z]+/g, function (m) {
  return m.toUpperCase() //全ての文字を大文字にする
})
console.log(r)//KEEP ON ASKING, AND IT WILL BE GIVEN YOU.

// 配列の数値を降順に並び替える
//Jsにおけるsort関数では、引数に「比較関数」を指定する必要がある
const ar = [100, 1, 20, 43, 30, 11, 4]
ar.sort((a, b) => { return b - a })//降順。もしa-bなら昇順になる
console.log(ar)//[ 100, 43, 30, 20, 11, 4, 1 ]

/*
アロー関数ではなく無名関数でソート

function compareFunc(a, b) {
  return a - b;//昇順。b-aなら降順
}
 
var num = [5, 3, 10, 6, 55];
num.sort(compareFunc);//[3, 5, 6, 10, 55]
*/