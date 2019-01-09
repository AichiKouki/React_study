//独自定義したHelloコンポーネント「をHTMLのid=rootに描画するように指示します
import React from 'react'
import ReactDOM from 'react-dom'
import {Hello} from './Hello'

ReactDOM.render(
  <Hello />,
  document.getElementById('root'))

