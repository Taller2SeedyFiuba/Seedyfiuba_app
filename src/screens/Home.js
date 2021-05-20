import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProjectRoute } from './Project.js'
import { SearchRoute } from './Search.js'
import { MessageRoute } from './Chat.js'
import { AccountRoute } from './Account.js'

const HomeTab = createMaterialBottomTabNavigator();

function Home() {
  return (
    <HomeTab.Navigator
      initialRouteName='Proyectos'
      activeColor='#151a13'
      inactiveColor='#40522f'
      barStyle={{ backgroundColor: '#77A656' }}
    >
      <HomeTab.Screen
        name='Proyectos'
        component={ProjectRoute}
        options={{
          tabBarLabel: 'Proyectos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Búsqueda'
        component={SearchRoute}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Mensajes'
        component={MessageRoute}
        options={{
          tabBarLabel: 'Mensajes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='chat' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Cuenta'
        component={AccountRoute}
        options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}



export {Home}