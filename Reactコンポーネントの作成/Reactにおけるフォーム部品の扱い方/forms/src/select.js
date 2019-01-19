import React from 'react'
import ReactDOM from 'react-dom'
//セレクトボックスのコンポーネント作成
//やってることはラジオボタンと同じ
class SelectForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: props.items,//selectボックスの選択肢となる値が複数入った配列が入る
      value: props.value //選択しているものの文字列が入ってる
    }
  }
  render () {
    // セレクトボックスの選択肢を生成
    const options = this.state.items.map(i => { //map関数で選択肢の配列の数だけ処理して、selectタグの中のoptionタグを動的に生成している
      return (<option key={i}
        value={i}> {i}
      </option>)
    })
    // フォームにセレクトボックスを指定
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        <select
          value={this.state.value}
          onChange={e => this.doChange(e)}>
          {options}
        </select><br />
        <input type='submit' />
      </form>
    </div>)
  }
  // セレクトボックスを変更したとき
  doChange (e) {
    this.setState({ value: e.target.value })
  }
  // フォームを送信したとき
  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.value)
  }
}

ReactDOM.render(
  <SelectForm
    items={['チョコ', '梅干し', 'ラムネ']}
    value='ラムネ' />,
  document.getElementById('root')
)
export default SelectForm
