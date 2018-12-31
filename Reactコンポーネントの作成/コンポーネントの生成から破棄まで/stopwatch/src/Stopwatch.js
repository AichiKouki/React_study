import React, { Component } from 'react'
import './Stopwatch.css'

// Stopwatchコンポーネントを定義
class Stopwatch extends Component {
  constructor (props) {
    super(props)
    this.state = { // 初期値を設定 --- (※1) 内部状態をもつコンポーネントを作成するから。ここの状態が変更されるとrender()が自動的に呼ばれる
      isLive: false,//ストップウォッチが動いているかどうかの状態
      curTime: 0,//現在時刻
      startTime: 0//startTimeがSTARTボタンを押した時刻を表す値
    }
    this.timerId = 0
  }
  // コンポーネントがDOMにマウント(追加)される直前 --- (※2) ここでは、1秒に1回処理が実行されるように、setInterval()でタイマー設定。(*3)で停止する。
  componentWillMount () {
    this.timerId = setInterval(e => {
      this.tick()
    }, 1000)
  }
  // アンマウントしたとき --- (※3)
  componentWillUnmount () {
    clearInterval(this.timerId)
  }
  // 毎秒実行される --- (※4)
  tick () {
    if (this.state.isLive) {//isLive(ストップウォッチが動いてるかどうか)がtrueなら処理
      const v = new Date().getTime()//現在の時刻を取得して、
      this.setState({curTime: v})//コンポーネントの内部状態のうちの一つの、現在時刻を表すcutTime値を更新
    }
  }
  // 開始・停止ボタンを押したとき --- (※5)
  clickHandler (e) {
    //isLive(ストップウォッチが動いているかどうかの状態によって、停止と開始を区別して処理)
    // 停止するとき
    if (this.state.isLive) {
      this.setState({isLive: false})
      return
    }
    // 開始するとき
    const v = new Date().getTime()
    this.setState({
      curTime: v,
      startTime: v,
      isLive: true})
  };
  // 時刻表示ディスプレイを返す --- (※6)
  getDisp () {//render()から呼ばれる
    const s = this.state
    const delta = s.curTime - s.startTime
    const t = Math.floor(delta / 1000)
    const ss = t % 60
    const m = Math.floor(t / 60)
    const mm = m % 60
    const hh = Math.floor(mm / 60)
    const z = (num) => {
      const s = '00' + String(num)
      return s.substr(s.length - 2, 2)
    }
    return <span className='disp'>
      {z(hh)}:{z(mm)}:{z(ss)}
    </span>
  }
  // 画面描画 --- (※7)
  render () {
    let label = 'START'
    if (this.state.isLive) {//ストップウォッチが動いている状態なら、STOPボタンを表示したいのでラベル名はSTOP。時間は動いている。
      label = 'STOP'
    }
    const disp = this.getDisp()
    const fclick = (e) => this.clickHandler(e)
    return (<div className='Stopwatch'>
      <div>{disp}</div>
      <button onClick={fclick}>{label}</button>
    </div>)
  }
}

export default Stopwatch

