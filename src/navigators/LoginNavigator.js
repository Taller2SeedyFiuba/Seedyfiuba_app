import * as React from 'react';
import * as Auth from '../providers/auth-provider.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login.js'
import { SignUp } from '../screens/SignUp.js'
import { SignUp2 } from '../screens/SignUpData.js'
import { SignIn } from '../screens/SignIn.js'
import { HomeRoute } from './HomeNavigator.js'

const MainStack = createStackNavigator();

const Main = () =>{
	React.useEffect(() => {
  		Auth.init();
	}, [])

    return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home" screenOptions={{headerShown: true, animationEnabled:true, title : ''}}>
        <MainStack.Screen name="Login" component={Login}/>
        <MainStack.Screen name="SignUp" component={SignUp}/>
        <MainStack.Screen name="SignUp2" component={SignUp2} options={{headerShown: false}}/>
        <MainStack.Screen name="SignIn" component={SignIn}/>
        <MainStack.Screen name="Home" component={HomeRoute} options={{headerShown: false}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export {Main};