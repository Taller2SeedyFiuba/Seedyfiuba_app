import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyProyects, FavouriteProyects } from '../screens/Project.js';
import { Search } from '../screens/Search.js';
import { Message } from '../screens/Chat.js';
import { Account } from '../screens/Account.js';
import {useTheme} from 'react-native-paper';
import {PreferencesContext} from '../components/PreferencesContext.js';


const ProjectTab = createMaterialTopTabNavigator();

function ProjectRoute () {
  const theme = useTheme();
  return (
  <ProjectTab.Navigator  tabBarOptions={{activeTintColor: theme.colors.accent, inactiveTintColor: theme.colors.card, indicatorStyle: { backgroundColor: theme.colors.primary}, tabStyle : {backgroundColor: theme.colors.primary}}}>
    <ProjectTab.Screen name='Mis Proyectos' component={MyProyects} />
    <ProjectTab.Screen name='Favoritos' component={FavouriteProyects} />
  </ProjectTab.Navigator>
  );
}

const HomeTab = createMaterialBottomTabNavigator();

function HomeRoute () {
  return (
    <HomeTab.Navigator initialRouteName='Proyectos'>
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