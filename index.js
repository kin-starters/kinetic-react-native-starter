import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
global.Buffer = global.Buffer || require('buffer').Buffer;
// eslint-disable-next-line no-unused-vars
import * as encoding from 'text-encoding';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
