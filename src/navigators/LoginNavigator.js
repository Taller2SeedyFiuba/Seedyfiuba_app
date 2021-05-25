import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login.js'
import { SignUp } from '../screens/SignUp.js'
import { SignUp2 } from '../screens/SignUpData.js'
import { SignIn } from '../screens/SignIn.js'
import { HomeRoute } from './HomeNavigator.js'

const MainStack = createStackNavigator();

const Main = ({theme}) =>{
    return (
    <NavigationContainer theme = {theme}>
      <MainStack.Navigator initialRouteName="Login" screenOptions={{headerShown: true, animationEnabled:true, title : ''}}>
        <MainStack.Screen name="Login" component={Login}/>
        <MainStack.Screen name="SignUp" component={SignUp}/>
        <MainStack.Screen name="SignUpData" component={SignUp2} options={{headerShown: false}}/>
        <MainStack.Screen name="SignIn" component={SignIn}/>
        <MainStack.Screen name="Home" component={HomeRoute} options={{headerShown: false}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export {Main};