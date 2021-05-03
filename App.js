import 'react-native-gesture-handler';
import * as React from 'react';
import {DefaultTheme,  Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

import {Main} from './src/Main.js';

export default function App() { 
  return (
  	<PaperProvider theme={theme}>
	    <Main/>
  	</PaperProvider>
  ); 
}