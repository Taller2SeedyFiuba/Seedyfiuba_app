import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login} from './screens/Login.js'
import {SignUp} from './screens/SignUp.js'
import {SignUp2} from './screens/SignUp2.js'
import {SignIn} from './screens/SignIn.js'
import {Home} from './screens/Home.js'
import * as Auth from './providers/auth-provider.js'

const Stack = createStackNavigator();

const Main = () =>{
	React.useEffect(() => {
  		Auth.init();
	}, [])

    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: true, animationEnabled:true, title : ''}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="SignUp2" component={SignUp2} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {Main};