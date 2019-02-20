/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

//必要なモジュールの宣言
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AlertIOS} from 'react-native';

import AppIntro from './AppIntro'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import {Calendar} from 'react-native-calendars';

// メインコンポーネントの宣言 --- (※1)
export default class TestNative extends Component {
		
  render () {
    // 配列データを定義 --- (※2)
    const lines = [
      'カレンダーを表示しています。', '---',
      '好きな日付を選択して、予定を入力してください'
    ]
    // 配列データを元に複数のコンポーネントを生成 --- (※3)
     //あらかじめ用意されているTextコンポーネントを使って値を指定して複数のTextコンポーネントを作成。
     //複数のTextコンポーネントが入った配列をViewコンポーネントの中に入れる
    const textLines = lines.map((e, i) => { //map関数で配列の各値ごとに処理
      return <Text
        style={styles.line}   
        key={e + i} children={e} />
    })
    return (
      <View style={styles.container}>
      //<AppIntro />
      <Calendar
        current={'2019-02-10'}  //現在の日付を指定
  minDate={'2018-06-01'}
  maxDate={'2018-06-15'}
  //onDayPress={(day) => {console.log('selected day', day)}}
  onDayPress={(day) => {AlertIOS.alert('','アラートを表示してみた',[{text:'OK'}]);}}
    markedDates={{
    '2019-02-10': { selected: true }, // 日付の背景に色（デフォルト）がつく
    '2019-02-11': { marked: true },  // 日付の下にドット（デフォルト）がつく
    '2019-02 -12': { selected: true, marked: true }, // selectedもmarkedもtrueの場合、ドットマークは白になる
    '2018-07-05': { selected: true, selectedColor: 'green' },　// 背景の色を変更したいときはselectedColorを指定する
    '2018-07-06': { marked: true, dotColor: 'red' }, // ドット色を変更したいときはdotColorを指定する
  }}
       />
        {textLines}
      </View>
    )
  }
}

// スタイルシートを宣言
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  line: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})