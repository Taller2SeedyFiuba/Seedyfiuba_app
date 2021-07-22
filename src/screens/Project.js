import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { ProjectListComponent } from './../components/ProjectListComponent.js';
import { useIsFocused } from '@react-navigation/native'

function uploadImagesUri(images){
  var images_url = [];
  images.forEach((image) => {
    Auth.uploadImageAsync(image.uri).then((imageUrl) => {
        images_url.push(imageUrl);
    });
  })
  return images_url;
};

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
        style={{margin:'5%'}}
        icon="plus-box"
      >
      Crear Proyecto
      </Button>

      <ProjectListComponent 
        viewProjectCallback = {viewProjectCallback}
        searchFunction = {Client.getProjectsMe}
        />
    </View>
  );
}

function FavouriteProjects ({navigation}) {

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <View style={styles.container}>
        <ProjectListComponent 
        viewProjectCallback = {viewProjectCallback}
        searchFunction = {Client.getFavouriteProjects}
        />
    </View>
  );
}

function SponsoredProjects ({navigation}) {

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return(
    <View style={styles.container}>
    </View>
  );
}

function SeerProjects ({navigation}) {
  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return(
    <View style={styles.container}>
        <ProjectListComponent 
        viewProjectCallback = {viewProjectCallback}
        searchFunction = {Client.getViewProjects}
        />
    </View>
  );
}

function NewSeerProjects ({navigation}) {
  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return(
    <View style={styles.container}>
        <ProjectListComponent 
        viewProjectCallback = {viewProjectCallback}
        searchFunction = {Client.getViewableProjects}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '10%',
    maxWidth: '80%',
  },
  scrollView: {
    marginHorizontal: 0,
  } ,
  title: {
    fontSize: 32,
  },
})

export {FavouriteProjects, MyProjects, SponsoredProjects, SeerProjects, NewSeerProjects}