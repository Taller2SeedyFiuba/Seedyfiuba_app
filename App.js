import 'react-native-gesture-handler';
import * as React from 'react';
import {DefaultTheme,  Provider as PaperProvider } from 'react-native-paper';
import {Main} from './src/navigators/LoginNavigator';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() { 
  return (
  	<PaperProvider theme={theme}>
	    <Main/>
  	</PaperProvider>
  ); 
}