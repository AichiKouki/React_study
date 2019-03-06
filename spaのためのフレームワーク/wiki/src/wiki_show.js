//サーバーAPIにアクセスして、wikiの表示内容を読み出して、画面に表示。その際、Wikiサーバーを通して、テキストを装飾します。
import React from 'react'
import request from 'superagent'
import WikiParser from './wiki_parser'
import styles from './styles'

// Wikiメイン画面表示コンポーネント
class WikiShow extends React.Component {
  constructor (props) {
    super(props)
    const {params} = this.props.match
    this.state = {
      name: params.name, body: '', loaded: false}
  }
  // Wikiの内容を読み込む ---(※1)
  componentWillMount () {
    request
      .get(`/api/get/${this.state.name}`)
      .end((err, res) => {
        if (err) return
        this.setState({
          body: res.body.data.body,
          loaded: true
        })
      })
  }
  // 画面の表示処理
  render () {
    //テキストの取得が完了するまでは、画面に「読み込み中」と表示する。
    if (!this.state.loaded) return (<p>読み込み中</p>) 
    const name = this.state.name
    const body = this.state.body
    const html = this.convertText(body)
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div style={styles.show}>{html}</div>
        <p style={styles.right}>
          <a href={`/edit/${name}`}>→このページを編集</a>
        </p>
      </div>
    )
  }
  // Wiki記法をReactオブジェクトに変換する --- (※2)
  convertText (src) {//render()の中でこのメソッドが呼ばれている。テキストボックスの中身がそのままsrcに入る。
    // Wiki記法をパースして配列データに変換
    const nodes = WikiParser.parse(src)//PEG.js用のソースコードをJavaScriptに変換したものを読み込んでいるので、このメソッドを使って変換できる.
    // 各要素をReactの要素に変換
    const lines = nodes.map((e, i) => {
      if (e.tag === 'ul') { // リスト
        const lis = e.items.map(
          (s, j) => <li key={`node${i}_${j}`}>{s}</li>
        )
        return <ul key={`node${i}`}>{lis}</ul>
      }
      if (e.tag === 'a') {
        return (<div key={`node${i}`}>
          <a href={`/wiki/${e.label}`}>→{e.label}</a>
        </div>)
      }
      return React.createElement(
        e.tag, {key: 'node' + i}, e.label)
    })
    return lines
  }
}
export default WikiShow

