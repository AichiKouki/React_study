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
import {Platform, StyleSheet, Text, View} from 'react-native';

import Carousel from "react-native-snap-carousel";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// メインコンポーネントの宣言 --- (※1)
export default class ExampleCcarousel extends Component {
  render () {
    // 配列データを定義 --- (※2)
    const lines = [
      '生まれるのに時あり', '死ぬのに時がある', '---',
      '泣くのに時があり', '笑うのに時がある', '---',
      '黙っているのに時があり', '話すのに時がある'
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
      <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
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