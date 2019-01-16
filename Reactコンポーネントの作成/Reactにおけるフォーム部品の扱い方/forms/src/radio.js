import React from 'react'
import ReactDOM from 'react-dom'
//ラジオボタンのコンポーネント作成
class RadioForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: props.items, //このコンポーネントのタグを使ったときに、プロパティの値を指定するので、その値を取得
      value: ''
    }
  }
  render () {
    // ラジオの選択肢を生成
    const radiolist = this.state.items.map(i => {//このコンポーネントのタグを使った際にプロパティを指定する。そのプロパティの配列の値の数だけ繰り返し処理して、新たな配列を作成する
      return (<div key={i}>
        <label>
          <input type='radio'
            name='items' value={i}
            checked={this.state.value === i}
            onChange={e => this.doChange(e)} /> {i}
        </label>
      </div>)
    })
    // フォームにラジオ一覧を指定
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        {radiolist}
        <input type='submit' />
      </form>
    </div>)
  }
  // ラジオボックスを変更したとき
  doChange (e) {
    this.setState({ value: e.target.value }) //洗濯したラジオボタンの値を、このコンポーネントの状態のvalueに入れる
  }
  // フォームを送信したとき
  doSubmit (e) {
    e.preventDefault()//Formのデフォルトの処理はしないように指定。
    window.alert(this.state.value) //洗濯したラジオボタンのvalueが状態のvalueに入ってるので、その値をそのまま表示
  }
}

ReactDOM.render(
  <RadioForm items={['チョコ', '梅干し', 'ラムネ']} />,
  document.getElementById('root'))

export default RadioForm
