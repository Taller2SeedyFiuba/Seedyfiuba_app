import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Tarjeta} from './Tarjeta.js';
//const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 
export default function App() { 
  return (
  	<PaperProvider>
      <Tarjeta/>
  	</PaperProvider>
  );
}