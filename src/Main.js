import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Screen_Registro, Screen_Datos} from './Screen_Registro.js'
import {Screen_Bienvenida} from './Screen_Bienvenida.js'

const Stack = createStackNavigator();

const Main = () =>{
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registro">
        <Stack.Screen name="Registro" component={Screen_Registro} />
        <Stack.Screen name="Registro datos" component={Screen_Datos} />
        <Stack.Screen name="Bienvenida" component={Screen_Bienvenida} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {Main};