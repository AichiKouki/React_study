import {appDispatcher} from './appDispatcher.js'

// 今回利用するActionを準備
export const ActionType = {
  CHANGE_NAME: 'CHANGE_NAME',
  SUBMIT_NAME: 'SUBMIT_NAME'
}

// Actionの生成 ... Dispatcherに情報を投げる
export const Actions = {
  changeName: (name) => {
    if (name === null) return
    appDispatcher.dispatch({//dispatch()が実行されると、stores.jsの中のregister()メソッドで登録したコールバック関数を全て実行する。
      actionType: ActionType.CHANGE_NAME, //dispatch()の引数がコールバック関数に与えられるので、アクション名やStoreに保存したいデータを含んだオブジェクトを引数に指定する
      value: name})
  },
  submitName: () => {
    appDispatcher.dispatch({
      actionType: ActionType.SUBMIT_NAME})
  }
}

