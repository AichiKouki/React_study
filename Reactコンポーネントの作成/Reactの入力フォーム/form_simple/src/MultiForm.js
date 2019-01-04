import React, {Component} from 'react'

// 複数テキストの入力コンポーネント
export default class MultiForm extends Component {
  constructor (props) {
    super(props)
    // フォームの初期値を設定する--- (※1)
    this.state = {
      name: 'クジラ',
      age: 22,
      hobby: '読書',
      pc_family:'macbook'
    }
  }
  // 値が変更されたとき --- (※2)
  doChange (e) {
    const userValue = e.target.value
    const key = e.target.name//複数の入力フォームがあるので、どの値なのかを区別するためにnameを取得。
    this.setState({[key]: userValue}) //特殊な書き方だが、これは連想配列として値を入れているのと同じ。さっき取得したnameに基づいて値をそれぞれ代入。状態の更新
  }
  // 送信ボタンが押されたとき
  doSubmit (e) {
    e.preventDefault()
    const j = JSON.stringify(this.state)
    window.alert(j)
  }
  // 画面の描画 --- (※3)
  render () {
    // イベントをメソッドにバインド
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit}>
        <div><label>
          名前: <br />
          <input name='name'
            type='text'
            value={this.state.name}
            onChange={doChange} />
        </label></div>
        <div><label>
          年齢: <br />
          <input name='age'
            type='number'
            value={this.state.age}
            onChange={doChange} />
        </label></div>
        <div><label>
          趣味: <br />
          <input name='hobby'
            type='text'
            value={this.state.hobby}
            onChange={doChange} />
        </label></div>
        <div><label>
          パソコンの種類: <br />
          <input name='pc_family'
            type='text'
            value={this.state.pc_family}
            onChange={doChange} />
        </label></div>
        <input type='submit' value='送信' />
      </form>
    )
  }
}

