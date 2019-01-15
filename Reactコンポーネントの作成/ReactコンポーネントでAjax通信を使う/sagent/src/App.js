import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Jsonファイルを読み込んで、果物を選択する選択ボックスを作成

//SuperAgentの利用を宣言
import request from 'superagent'

class App extends Component {
  constructor (props) {
    super(props)
    // 状態の初期化
    this.state = {
      items: null // 読み込んだデータ保存用
    }
  }
  // マウントされるとき
  componentWillMount () {//ライフサイクルにおける、DOMにマウントされるタイミングで呼ばれる
    // JSONデータを読み込む(非同期通信で) --- (※2)
    request.get('./fruits.json')
      .accept('application/json')//JSONデータであることを指定している
      .end((err, res) => {//データを受信した時の処理を指定。errはエラー情報で、resはコールバック関数の引数に得られる値
        this.loadedJSON(err, res)
      })
  }
  // データを読み込んだとき --- (※3)
  loadedJSON (err, res) {
    if (err) {
      console.log('JSON読み込みエラー')
      return
    }
    // 状態を更新 --- (※4)
    this.setState({
      //サーバーから読み込んだデータはjSON文字列だが、自動的にパースされ、res.bodyはJavascript型のオブジェクトとなる
      items: res.body//resはオブジェクトであり、ヘッダー情報やその他情報を含んでいる
    })
  }
  //optionタグのkeyプロパティは、要素の追加とか削除する場合は、key属性も書いた方が、より最低限のデータ更新となる。
  render () {
    // JSONデータの読み込みが完了してるか? --- (※5)
    if (!this.state.items) {
      return <div className='App'>
        現在読み込み中</div>
    }
    // 読み込んだデータからselect要素を作る --- (※6)
    const options = this.state.items.map(e => {
      return <option value={e.price} key={e.name}>
        {e.name}
      </option>
    })
    return (
      <div className='App'>
        果物: <select>{options}</select>
      </div>
    )
  }
}

export default App

