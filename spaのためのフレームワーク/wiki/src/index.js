//React Routerを利用して、アクセスされたURLに応じて表示するコンポーネントを変更するようにしている。
import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import WikiEdit from './wiki_edit'
import WikiShow from './wiki_show'
//指定されたパスによって、表示するコンポーネントが決まる
const WikiApp = () => (
  <Router>
    <div>
      <Route path='/wiki/:name' component={WikiShow} />
      <Route path='/edit/:name' component={WikiEdit} />
    </div>
  </Router>
)

// DOMにメインコンポーネントを書き込む
ReactDOM.render(
  <WikiApp />,
  document.getElementById('root'))

