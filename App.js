import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import {Main} from './src/Main.js';

export default function App() { 
  return (
  	<PaperProvider>
	    <Main/>
  	</PaperProvider>
  ); 
}