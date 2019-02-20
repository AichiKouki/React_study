/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// メインコンポーネントを登録 --- (※4)
//AppRegistry.registerComponent('TestNative', () => TestNative)
AppRegistry.registerComponent(appName, () => App);
