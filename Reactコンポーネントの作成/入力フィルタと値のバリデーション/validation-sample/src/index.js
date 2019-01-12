import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ZipInput from './ZipInput'
import FormInput from './FormInput'
import * as serviceWorker from './serviceWorker';

class CustomForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      tel: '',
      url:'',
      allok: false
    }
    this.oks = {}
  }
  handleChange (e) {
    // すべての項目がOKになったか?
    this.oks[e.name] = e.isOK //isOkは、FormInputコンポーネントの状態。そのコンポーネントの中の、パターンにマッチしているかどうかを確かめて、trueかfalseが入る。
    this.setState({
      [e.name]: e.value,
      allok: (this.oks['email'] && this.oks['tel'] && this.oks['url']) //配列に入ったそれぞれが、全てtrueなら、trueが入る
    })
  }
  handleSubmit (e) {
    window.alert(JSON.stringify(this.state))
    e.preventDefault()
  }
  render () {
    const doChange = e => this.handleChange(e)
    const doSubmit = e => this.handleSubmit(e)
    // Eメールを表すパターン
    const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // ASCII文字以外全部
    const asciiFilter = /[^\u0020-\u007e]+/g
    const urlPat = /^https?(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/
    return (
      <form onSubmit={doSubmit}>
        <FormInput name='email' label='メール'
          value={this.state.email}
          filter={asciiFilter}
          pattern={emailPat}
          onChange={doChange} />
        <FormInput name='tel' label='電話番号'
          value={this.state.tel}
          filter={/[^0-9-()+]/g}
          pattern={/^[0-9-()+]+$/}
          onChange={doChange} />
        <FormInput name='url' label='URL'
          value={this.state.url}
          filter={asciiFilter}
          pattern={urlPat}
          onChange={doChange} />
        <input type='submit' value='送信'
          disabled={!this.state.allok} />
      </form>
    )
  }
}

ReactDOM.render(<CustomForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
