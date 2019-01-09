//郵便番号の入力コンポーネント
//数字以外は除外して、「数字3桁-数字4桁」の形になるまでNGと表示して、その形になったらOKとリアルタイムに表示する
import React, {Component} from 'react'

// 郵便番号を入力するコンポーネント
export default class ZipInput extends Component {
  constructor (props) {
    super(props)
    const v = (this.props.value)
      ? this.props.value : ''
    // 状態を初期化 --- (※1)
    this.state = {
      value: v, //テキストボックスに入力される値
      isOK: this.checkValue(v) //その入力された値を引数にして、郵便番号の構造になってるかどうかを確かめるメソッドを呼び出す
    }
  }
  // パターンに合致するかチェック --- (※2)
  checkValue (s) {
    const zipPattern = /^\d{3}-\d{4}$/
    return zipPattern.test(s) //文字列を正規表現でチェックできるメソッドが用意されてる。trueかfalseがreturnされる
  }
  // 値がユーザーにより変更されたとき --- (※3)
  handleChange (e) {
    const v = e.target.value
    // 数値とハイフン以外を除外
    const newValue = v.replace(/[^0-9-]+/g, '')//数値とハイフン以外は削除
    const newIsOK = this.checkValue(newValue) //数値とハイフン以外削除された文字列が、郵便番号の構造になってるかどうか確かめるメソッドを呼び出す
    // 状態に設定
    this.setState({
      value: newValue,
      isOK: newIsOK
    })
    // イベントを実行する --- (※4)
    if (this.props.onChange) {//変更が起きたことをイベントの形で通知する(今回はここは使ってない)
      this.props.onChange({
        target: this,
        value: newValue,
        isOK: newIsOK
      })
    }
  }
  // プロパティが変更されたとき --- (※5)
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value,
      isOK: this.checkValue(nextProps.value)
    })
  }
  // 描画 --- (※6)
  render () {
    const msg = this.renderStatusMessage() //NGかOKかを描画するメソッドを呼び出して、そのHTMLタグを取得
    return (<div>
      <label>郵便番号: <br />
        <input type='text'
          placeholder='郵便番号を入力'
          value={this.state.value}
          onChange={e => this.handleChange(e)} />
        {msg}
      </label>
    </div>)
  }
  // 入力が正しいかどうかのメッセージ --- (※7) コンポーネントの状態のisOKに基づいて、「NG」と「OK」を描画する
  renderStatusMessage () {
    // メッセージ表示用の基本的なStyle
    const so = {
      margin: '8px',
      padding: '8px',
      color: 'white'
    }
    let msg = null
    if (this.state.isOK) { // OKのとき
      so.backgroundColor = 'green'
      msg = <span style={so}>OK</span>
    } else { // NGのとき (ただし空白の時は非表示)
      if (this.state.value !== '') {
        so.backgroundColor = 'red'
        msg = <span style={so}>NG</span>
      }
    }
    return msg
  }
}

