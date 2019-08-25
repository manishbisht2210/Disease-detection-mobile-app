/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import GetDiseaseResult from './GetDiseaseResult';
import ImagePickerPage from './ImagePickerPage';
const App = createStackNavigator({
  Home: { screen: ImagePickerPage },
  DiseaseResult: { screen: GetDiseaseResult }
});
export default App;

