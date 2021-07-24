import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { ProjectListComponent } from './../components/ProjectListComponent.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '10%',
    maxWidth: '80%',
  },
})

function MyProjects ({navigation}) {

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <View style={{flex:1}}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('NewProject')}
        size={30}
        style={{margin:'6%'}}
        icon="plus-box"
      >
      Crear Proyecto
      </Button>

      <ProjectListComponent 
        viewProjectCallback = {viewProjectCallback}
        searchFunction = {Client.getProjectsMe}
        message = {'No tienes proyectos creados'}
        />
    </View>
  );
}

function FavouriteProjects ({navigation}) {

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <ProjectListComponent 
      viewProjectCallback = {viewProjectCallback}
      searchFunction = {Client.getFavouriteProjects}
      message = {'No tienes proyectos favoritos'}
    />
  );
}

function SponsoredProjects ({navigation}) {

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <ProjectListComponent 
      viewProjectCallback = {viewProjectCallback}
      searchFunction = {Client.getSponsoredProjects}
      message = {'No tienes proyectos que hayas patrocinado'}
    />
  );
}

function SeerProjects ({navigation}) {
  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <View style={styles.container}>
        <ProjectListComponent 
        viewProjectCallback = {viewProjectCallback}
        searchFunction = {Client.getViewProjects}
        message = {'No tiene proyectos supervisados.'}
        />
    </View>
  );
}

function NewSeerProjects ({navigation}) {
  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <View style={styles.container}>
        <ProjectListComponent 
        viewProjectCallback = {viewProjectCallback}
        searchFunction = {Client.getViewableProjects}
        message = {'Navegue hasta Cuenta y aplique para ser veedor.'}
        />
    </View>
  );
}

export {FavouriteProjects, MyProjects, SponsoredProjects, SeerProjects, NewSeerProjects}