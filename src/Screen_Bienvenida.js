import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Screen_Bienvenida({ navigation }){
 return (
    <View style={style.container}>
      <Text>Bienvenido.</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})


export {Screen_Bienvenida};