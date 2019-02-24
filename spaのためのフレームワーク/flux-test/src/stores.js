//Storeを定義。ActionとStoreを結びつけるように、Dispatcherにコールバック関数を登録する。
import {appDispatcher} from './appDispatcher.js'//Dispatcherにコールバック関数を登録するため
import {ActionType} from './actions.js'//ActionとここのStoreを結びつけるため

// 今回利用するStoreを用意
export const nameStore = {name: '', onChange: null}
export const messageStore = {message: '', onChange: null}

// ActionとStoreを結びつける
appDispatcher.register(payload => {//registerメソッドでコールバック関数を登録
  if (payload.actionType === ActionType.CHANGE_NAME) {//action.jsでのdispatch()に与えた引数が、ここのコールバック関数に与えられる
    nameStore.name = payload.value 
    nameStore.onChange()////上記の連想配列に代入。index.jsでstores.jsと結びつけたので、結果的にViewとなるindex.jsの中のnameStore.onChangeも処理される
  }
})
appDispatcher.register(payload => {
  if (payload.actionType === ActionType.SUBMIT_NAME) {
    messageStore.message = nameStore.name + 'さん、こんにちは。'
    messageStore.onChange()
  }
})

