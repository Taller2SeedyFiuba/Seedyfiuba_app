import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Main = () =>{
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registro">
        <Stack.Screen name="Registro" component={Scr_Registro} />
        <Stack.Screen name="Registro bien" component={Scr_Bien} />
        <Stack.Screen name="Registro mal" component={Scr_Mal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Scr_Registro({ navigation }){
 return (
    <View style={style.container}>
      <Text>Registro</Text>
      <Button
        title="Registrarse bien"
        onPress={() => navigation.navigate('Registro bien')}
      />

      <Button
        title="Registrarse mal"
        onPress={() => navigation.navigate('Registro mal')}
      />
    </View>
  )
}


function Scr_Bien({ navigation }){
 return (
    <View style={style.container}>
      <Text>Registro bien</Text>
    </View>
  )
}

function Scr_Mal({ navigation }){
 return (
    <View style={style.container}>
      <Text>Registro mal</Text>
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

export {Main};