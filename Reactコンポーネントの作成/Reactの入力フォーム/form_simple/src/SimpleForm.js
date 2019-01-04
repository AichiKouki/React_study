import React from 'react'
// フォームコンポーネント
export class SimpleForm extends React.Component {
  constructor (props) {
    super(props)//thisを使えるようにする
    // 状態を初期化 --- (※1)
    this.state = { value: '' }
  }
  // 値が変更されたとき --- (※2)
  doChange (e) {//inputフォームの内容が変わるたびに、コンポーネントの状態の値を更新する
    const newValue = e.target.value
    this.setState({value: newValue})
  }
  // 送信ボタンが押されたとき --- (※3)
  doSubmit (e) {//送信ボタンが押されたら、コンポーネントの状態を取得して、その値をアラートで表示
    window.alert('値を送信: ' + this.state.value)
    e.preventDefault()//イベントのデフォルトの動作をしないようにする。フォームは本来ページが遷移するものだが今回は値を表示したいだけだから
  }
  // 画面の描画 --- (※4)
  render () {
    // イベントをメソッドにバインド
    //inputタグの値が変わるたびに、doChange関数オブジェクトが呼ばれ、送信ボタンが押されたら、doSubmit関数オブジェクトが呼ばれる
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit}>
        <input type='text'
          value={this.state.value}
          onChange={doChange} />
        <input type='submit' value='送信ボタン' />
      </form>
    )
  }
}

