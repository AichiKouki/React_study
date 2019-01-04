import React, { Component } from 'react';
//import logo from './logo.svg';
import { SimpleForm } from './SimpleForm' //SimpleForm.jsのSimpleFormコンポーネントを読み込む
import './App.css';

//メイン画面のコンポーネント
export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <SimpleForm />
      </div>
    )
  }
}

