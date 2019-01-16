import React from 'react'
import ReactDOM from 'react-dom'
//チェックボックスのコンポーネント作成
//テキストボックスのコンポーネントの時とやってることはほとんど同じ
class CBoxForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { check: true }
  }
  render () {
    // フォームにチェックボックスを指定
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        <label>
          <input type='checkbox'
            onChange={e => this.doChange(e)}
            checked={this.state.check}
            />食べる
        </label><br />
        <input type='submit' value='決定' />
      </form>
    </div>)
  }
  // チェックボックスをクリックしたとき
  doChange (e) {
    this.setState({ check: !this.state.check }) //反対の値を状態に入れる
  }
  // フォームを送信したとき
  doSubmit (e) {
    e.preventDefault() //Formタグのデフォルトの機能を動作しないように指定
    window.alert(this.state.check ? '食べる' : '食べない')//チェックボックスの値の状態に基づいて、三項演算子で表示内容を決定
  }
}

ReactDOM.render(
  <CBoxForm />,
  document.getElementById('root')
)

export default CBoxForm
