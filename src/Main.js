import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login} from './screens/Login.js'
import {SignUp} from './screens/SignUp.js'
import {SignUp2} from './screens/SignUp2.js'
import {SignIn} from './screens/SignIn.js'
import {Home} from './screens/Home.js'
import * as Auth from './providers/provider_firebase.js'

const Stack = createStackNavigator();

const Main = () =>{
	React.useEffect(() => {
  		Auth.init();
	}, [])

    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUp2" component={SignUp2} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {Main};