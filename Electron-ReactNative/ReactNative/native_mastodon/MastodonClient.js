/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
 
// 利用するコンポーネントを列挙する
import React, {Component} from 'react';
import {
  Platform,StyleSheet, Text, TextInput, View, Image,
  Button, WebView, FlatList
} from 'react-native'

// マストドンの設定 (※1)
//fbba954d7ab98a98e7b3ebc8805cfe8258162d415b8a72ba1a65a8481ed2794a
const mstdnToken = '6856e393dac03f4b8ba96a30ae56041ed7c622278627d74966279c42cd0705e3'
const apiUrl = 'https://pawoo.net/api/v1/'

// マストドンのAPIを利用する(呼び出す)関数を定義 --- (※2)
//非同期通信を行えるfetch APIを利用して、結果をcallback関数に返す
function callAPI (uri, options, callback) {
  options.headers = {
    'Authorization': 'Bearer ' + mstdnToken,
    'Content-Type': 'application/json'
  }
  console.log(options)
  fetch(apiUrl + uri, options)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      callback(data)
    })
    .catch((error) => {
      console.error(error)
    })
}

// マストドンのクライアントアプリのメインコンポーネント --- (※3)
export default class MastodonClient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: mstdnToken,
      timelines: [],
      tootdata: ''
    }
    this.loadTimelines()
  }
  // APIを呼びだしてタイムラインを読む --- (※4)
  loadTimelines () {
    callAPI('timelines/home', {method: 'GET'}, e => {//callAPIは、(*2)にある
      this.setState({timelines: e})
    })
  }
  // メイン画面を描画 --- (※5)
  render () {
    return (
      <View style={styles.container}>
        {this.renderEditor()}
        <FlatList //タイムラインの描画にはFlatListというコンポーネントを利用する
          keyExtractor={item => item.id} //ここはこういう決まりでitemは自分で作ってない
          data={this.state.timelines} //配列データを指定
          renderItem={e => this.renderTimelines(e)}//どのように描画するかを指定
          />
      </View>
    )
  }
  // エディタ部分 --- (※6)
  renderEditor () {
    return (
      <View style={styles.inputview}>
        <TextInput
          style={styles.input}
          value={this.state.tootdata}
          onChangeText={e =>
            this.setState({tootdata: e})}
          placeholder='今、何してる？'
          />
        <Button title='トゥート'
          style={styles.tootButton}
          onPress={e => this.toot(e)} />
      </View>
    )
  }
  // タイムラインの各アイテムを描画 --- (※7)
  renderTimelines (item) {
    const e = item.item
    const src = {uri: e.account.avatar}
    // 表示名の確認 --- (※8)
    let name = e.account.display_name
    if (!name) name = e.account.acct
    let date = new Date(e.created_at)//投稿時間をUTCから日本時間に変換
    let created_at = date.toLocaleString();//投稿時間をUTCから日本時間に変換
    return (
      <View style={styles.item} key={e.id}>
        <View style={styles.avatar}>
          <Image source={src}
            style={styles.avatarImage} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.name}>{name}</Text>
          <WebView style={styles.body}
            automaticallyAdjustContentInsets={false}
            source={{html: e.content}}
          />
          <Text style={styles.created_at}>{created_at}</Text> 
        </View>
      </View>
    )
  }
  // 発言処理 --- (※9)
  //トゥート(ツイートみたいな)ボタンが押されたらAPIを呼び出して書き込み処理
  toot (e) {
    const options = {
      'method': 'POST',
      'body': JSON.stringify({
        'status': String(this.state.tootdata)
      })
    }
    callAPI('statuses', options, e => {
      console.log(e)
      this.loadTimelines()
      this.setState({'tootdata': ''})
    })
  }
}

// スタイルの指定 --- (※10)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  inputview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 50, //元々は8
    padding: 8,
    backgroundColor: '#fff0f0'
  },
  input: {
    width: 330,
    height: 40,
    backgroundColor: '#f0f0f0'
  },
  tootButton: {
    color: '#841584',
    padding: 4,
    margin: 4
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginBottom: 8
  },
  avatar: {
    height: 120,
    width: 100
  },
  itemText: {
    flexDirection: 'column',
    width: 850 //書き込んだ本文のフォントのサイズを指定
  },
  avatarImage: {
    width: 100,
    height: 100
  },
  name: {
    padding: 4,
    margin: 4,
    fontSize: 14,
    backgroundColor: '#f0ffff'
  },
  body: {
    padding: 4,
    margin: 4,
    backgroundColor: 'transparent'
  },
  created_at:{
    padding: 4,
    margin: 4,
    fontSize: 14,
    color:'#808080'
  }
})
