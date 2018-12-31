//Reactのコンポーネントは、生成、破棄、状態の変更などのタイミングで、自動的にいろんなメソッドが呼ばれる。
//以下のいろんなメソッドは、それぞれライフサイクルに関するメソッド
import React, { Component } from 'react'
class App extends Component {
//〜コンポーネントの生成とマウント(追加)〜
  // マウント
  constructor (props) {//オブジェクトが生成されるタイミング
    super(props)
    console.log('constructor')
  }
  componentWillMount () {//コンポーネントがDOMにマウント(追加)される直前
    console.log('componentWillMount')
  }
  componentDidMount () {//コンポーネントがDOMにマウント(追加)された直後
    console.log('componentDidMount')
  }
  // 更新
  componentWillReceiveProps (nextProps) {//コンポーネントのプロパティが変更されたとき
    console.log('componentWillReceiveProps')
  }
  shouldComponentUpdate (nextProps, nextState) {//コンポーネントの外観を更新して良いかどうか(パフォーマンスチューニングが必要な時に実装するメソッド)
    console.log('shouldComponentUpdate')
    return true
  }
  componentWillUpdate () {//コンポーネントが更新される直前
    console.log('componentWillUpdate')
  }
  componentDidUpdate () {
    console.log('componentDidUpdate')
  }
  // アンマウント
  componentWillUnmount () {
    console.log('componentWillUnmount')
  }
  render () {
    console.log('render')
    const setStateHandler = (e) => {
      console.log('* call setState()')
      this.setState({r: Math.random()})
    }
    return (
      <div>
        <button onClick={setStateHandler}>
        setState</button>
      </div>
    )
  }
}

export default App

