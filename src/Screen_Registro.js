import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Screen_Registro({ navigation }){
 return (
    <View style={style.container}>
      <Text>Registro</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Bienvenida')}
      />

      <Button
        title="Registro"
        onPress={() => navigation.navigate('Registro datos')}
      />
    </View>
  )
}


function Screen_Datos({ navigation }){
 return (
    <View style={style.container}>
      <Text>Pedir edad, apodo, etc.</Text>
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


export {Screen_Registro, Screen_Datos};