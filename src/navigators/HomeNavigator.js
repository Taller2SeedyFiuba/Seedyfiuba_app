import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyProyects, FavouriteProyects } from '../screens/Project.js'
import { Search } from '../screens/Search.js'
import { Message } from '../screens/Chat.js'
import { Account } from '../screens/Account.js'

const ProjectTab = createMaterialTopTabNavigator();

function ProjectRoute () {
  return (
  <ProjectTab.Navigator>
    <ProjectTab.Screen name='Mis Proyectos' component={MyProyects} />
    <ProjectTab.Screen name='Favoritos' component={FavouriteProyects} />
  </ProjectTab.Navigator>
  );
}

const HomeTab = createMaterialBottomTabNavigator();

function HomeRoute () {
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
        component={Search}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Mensajes'
        component={Message}
        options={{
          tabBarLabel: 'Mensajes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='chat' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Cuenta'
        component={Account}
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

export {HomeRoute}