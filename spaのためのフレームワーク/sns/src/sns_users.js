import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from './styles'

export default class SNSUsers extends Component {
  constructor (props) {
    super(props)
    this.state = { users: [], jump: '', friends: [] }
  }
  componentWillMount () {
    this.loadUsers()
  }
  // ユーザ一覧と自身の友達情報を得る --- (※1)
  //サーバーAPIを呼び出して、データを取得。
  loadUsers () {
    request
      .get('/api/get_allusers')
      .end((err, res) => {
        if (err) return
        this.setState({users: res.body.users})
      })
    request
      .get('/api/get_user')
      .query({userid: window.localStorage.sns_id})
      .end((err, res) => {
        console.log(err, res)
        if (err) return
        this.setState({friends: res.body.friends})
      })
  }
  // 友達追加のボタンを押した時 --- (※2)
  addFriend (friendid) {
    if (!window.localStorage.sns_auth_token) {//ログインしていなければ友達追加はできないので、localStorageの値を確認して、ログインしていなければログイン画面にリダイレクトさせる。
      window.alert('先にログインしてください')
      this.setState({jump: '/login'})
      return
    }
   //ログインしていれば、友達追加のAPIを呼び出す
    request
      .get('/api/add_friend')
      .query({
        userid: window.localStorage.sns_id,
        token: window.localStorage.sns_auth_token,
        friendid: friendid
      })
      .end((err, res) => {
        if (err) return
        if (!res.body.status) {
          window.alert(res.body.msg)
          return
        }
        this.loadUsers()//友達追加した後、再度ユーザー情報を読み込む
      })
  }
  render () {
    if (this.state.jump) {
      return <Redirect to={this.state.jump} />
    }
    const friends = this.state.friends ? this.state.friends : {}
    console.log(this.state.users)// ["d", "aichi"]って感じで取得できた
    const ulist = this.state.users.map(id => {
      //三項演算子で(※1)で取得した情報を元に、すでに友達になっているかを判断し、友達になっていなければ、友達追加のボタンを表示する。
      if(id==window.localStorage.sns_id) return //ユーザー一覧で、自分だけは表示しないようにするため(自分自身を友達追加というバグ対策)
      const btn = (friends[id])
        ? `${id}は友達です`
        : (<button onClick={eve => this.addFriend(id)}>
          {id}を友達に追加</button>)
      return (<div key={'fid_' + id} style={styles.friend}>
        <img src={'user.png'} width={80} /> {btn}
      </div>)
    })
    return (
      <div>
        <h1>ユーザの一覧</h1>
        <div>{ulist}</div>
        <div><br /><a href={'/timeline'}>→タイムラインを見る</a></div>
      </div>
    )
  }
}

