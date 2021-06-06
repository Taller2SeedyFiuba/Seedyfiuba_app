import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login.js';
import { SignUp } from '../screens/SignUp.js';
import { SignUpData } from '../screens/SignUpData.js';
import { SignIn } from '../screens/SignIn.js';
import { ResetPassword } from '../screens/ResetPassword.js';
import { HomeRoute } from './HomeNavigator.js';

const MainStack = createStackNavigator();

const Main = ({theme}) =>{
    return (
    <NavigationContainer theme = {theme}>
      <MainStack.Navigator initialRouteName="Login" screenOptions={{headerShown: true, animationEnabled:true, title : ''}}>
        <MainStack.Screen name="Login" component={Login}/>
        <MainStack.Screen name="SignUp" component={SignUp}/>
        <MainStack.Screen name="SignUpData" component={SignUpData} options={{headerShown: false}}/>
        <MainStack.Screen name="SignIn" component={SignIn}/>
        <MainStack.Screen name="ResetPassword" component={ResetPassword}/>
        <MainStack.Screen name="Home" component={HomeRoute} options={{headerShown: false, gestureEnabled: false}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export {Main};