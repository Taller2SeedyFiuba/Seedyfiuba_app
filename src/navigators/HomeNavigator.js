import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyProjects, FavouriteProjects, SponsoredProjects, SeerProjects, NewSeerProjects } from '../screens/Project.js';
import { Search } from '../screens/Search.js';
import { Message } from '../screens/Chat.js';
import { Account } from '../screens/Account.js';
import { OtherAccount } from '../screens/OtherAccount.js';
import { useTheme } from 'react-native-paper';
import { NewProject } from '../screens/NewProject.js'
import { ProjectInfo } from '../screens/ProjectInfo'
import { createStackNavigator } from '@react-navigation/stack';

const ProjectStack = createStackNavigator();

function ProjectStackNav () {
  return (
    <ProjectStack.Navigator initialRouteName="ProjectRoute" screenOptions={{headerShown: false}}>
      <ProjectStack.Screen name="ProjectRoute" component={ProjectRoute}/>
      <ProjectStack.Screen name="NewProject" component={NewProject}/>
    </ProjectStack.Navigator>
);
}


const SeerProjectsTab = createMaterialTopTabNavigator();

function SeerProjectsRoute ({navigation}) {
  const theme = useTheme();

  return (
      <SeerProjectsTab.Navigator
        tabBarOptions={{
          // style: {backgroundColor: theme.colors.primary, height:70, paddingVertical:10},
          showIcon: true,
          // showLabel: false
          lazy: false
        }}
      >

      <SeerProjectsTab.Screen 
      name='SeerProjects' 
      component={SeerProjects} 
      options={{
        showIcon:true,
        tabBarLabel: 'Veídos'
      }}
      />

      <SeerProjectsTab.Screen 
      name='NewSeerProjects' 
      component={NewSeerProjects} 
      options={{
        showIcon:true,
        tabBarLabel: 'Nuevos'
      }}
      />

      </SeerProjectsTab.Navigator>
  );
}

const ProjectTab = createMaterialTopTabNavigator();

//tabBarOptions={{activeTintColor: theme.colors.accent, inactiveTintColor: theme.colors.card, indicatorStyle: { backgroundColor: theme.colors.primary}, tabStyle : {backgroundColor: theme.colors.primary}}}
function ProjectRoute ({navigation}) {
  const theme = useTheme();
  return (
    <ProjectTab.Navigator
      tabBarOptions={{
        style: {backgroundColor: theme.colors.primary, height:70, paddingVertical:10},
        showIcon: true,
        showLabel: false,
        lazy: false
      }}
    >
      <ProjectTab.Screen
        name='MyProjects'
        component={MyProjects}
        options={{
          showIcon:true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='file-document-edit' color={color} size={26} />
          ),
        }}
      />
      <ProjectTab.Screen 
        name='SponsoredProjects' 
        component={SponsoredProjects}
        options={{
          showIcon:true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='cash-multiple' color={color} size={26} />
          ),
        }}
      />
      <ProjectTab.Screen 
      name='FavouriteProjects' 
      component={FavouriteProjects} 
      options={{
        showIcon:true,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name='star' color={color} size={26} />
        ),
      }}
      />

      <ProjectTab.Screen 
        name='SeerProjectsRoute' 
        component={SeerProjectsRoute} 
        options={{
          showIcon:true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='eye' color={color} size={26} />
          ),
        }}
      />

    </ProjectTab.Navigator>
  );
}

const HomeTab = createMaterialBottomTabNavigator();

function HomeRoute () {
  return (
    <HomeTab.Navigator initialRouteName='Proyectos'>
      <HomeTab.Screen
        name='ProjectStackNav'
        component={ProjectStackNav}
        options={{
          tabBarLabel: 'Proyectos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Message'
        component={Message}
        options={{
          tabBarLabel: 'Mensajes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='chat' color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name='Account'
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

const HomeStack = createStackNavigator();

function HomeStackNav () {
  return (
    <HomeStack.Navigator initialRouteName="HomeRoute" screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeRoute" component={HomeRoute}/>
      <HomeStack.Screen name="ProjectInfo" component={ProjectInfo}/>
      <HomeStack.Screen name="OtherAccount" component={OtherAccount}/>
    </HomeStack.Navigator>
);
}

export {HomeStackNav}