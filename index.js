/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Navigator from './src/Navigator';
import Greeting from './src/Greeting';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);