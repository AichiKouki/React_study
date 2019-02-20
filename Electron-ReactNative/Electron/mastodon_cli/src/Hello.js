import React, {Component} from 'react'
import ReactDOM from 'react-dom'

//コンポーネント定義
export default class Hello extends Component{
  render(){
    return(<div>
      <h1>Hello world</h1>
    </div>)
  }
}

//DOMを書き換え
ReactDOM.render(
  <Hello />,
  document.getElementById('root')
)

