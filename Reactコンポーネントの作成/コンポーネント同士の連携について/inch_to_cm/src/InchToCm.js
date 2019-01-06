//ValueInputコンポーネントとの連携する。ValueInputコンポーネントのvalueの部分にここの状態を当てはめることで、自動的にrenderされる
import React, {Component} from 'react'
import ValueInput from './ValueInput'

// インチセンチの変換コンポーネント
export default class InchToCm extends Component {
  constructor (props) {
    super(props)
    // ValueInputに表示する値を状態として保持 --- (※1)
    this.state = {
      inch: 0, cm: 0
    }
  }
  // インチが変更されたとき --- (※2)
  inchChanged (e) {
    const inchValue = e.value
    const cmValue = inchValue * 2.54
    this.setState({
      inch: inchValue,
      cm: cmValue
    })
  }
  // センチが変更されたとき  --- (※3)
  cmChanged (e) {
    const cmValue = e.value
    const inchValue = cmValue * 2.54
    this.setState({
      inch: inchValue,
      cm: cmValue
    })
  }
  // 画面の描画 --- (※4)
  //ValueInputタグでは、<label>や<input>タグを絵画していて、数字以外は除外して値を表示してるだけ
  //ValueInputタグのvalueにこのコンポーネントの状態を入れることにより、入力するたび(インチとセンチの状態が変わるたびに)にrender()が呼ばれる
  render () {
    return (
      <div>
        <ValueInput title='inch'
          onChange={e => this.inchChanged(e)}
          value={this.state.inch} />
        <ValueInput title='cm'
          onChange={e => this.cmChanged(e)}
          value={this.state.cm} />
      </div>
    )
  }
}

