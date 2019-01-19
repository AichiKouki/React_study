import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TextForm from './text';
import CBoxForm from './cbox';
import TextAreaForm from './textarea';
import RadioForm from './radio';
//radioの中のコンポーネントとselectのコンポーネントで被っている部分があって両方インポートするとエラーがでる
//import SelectForm from './select';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RadioForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
