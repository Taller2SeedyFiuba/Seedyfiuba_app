import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Text, Divider, Button, Card, IconButton } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { NewProject } from './NewProject.js';
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
  const [data, setData] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
    Client.getProjectsMe(token).then((resp) =>{
      var copy = [];
      resp.forEach((element) =>{
        var newElement = {};
        newElement.id = element.id.toString();
        newElement.title = element.title;
        newElement.icon = element.icon;
        copy.push(newElement);
      });
      setData(copy);
        }).catch((error) => {
       if(error != 401) console.log('Error:' + error)
    });
    }).catch((error) => {
       console.log(Auth.errorMessageTranslation(error));
    });
  }, [isFocused]);
  
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
        <ProjectListComponent data = {data}
                              viewProjectCallback = {viewProjectCallback}
                              viewButtonsCallback = {viewProjectCallback}
                              />
    </View>
  );
}

function FavouriteProjects ({navigation}) {
  const [data, setData] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
    Client.getFavouriteProjects(token).then((resp) =>{
      var copy = [];
      resp.forEach((element) =>{
        var newElement = {};
        newElement.id = element.id.toString();
        newElement.title = element.title;
        newElement.icon = element.icon;
        copy.push(newElement);
      });
      setData(copy);
    }).catch((error) => {
       if(error != 401) console.log('Error:' + error)
    });
    }).catch((error) => {
       console.log(Auth.errorMessageTranslation(error));
    });
  }, [isFocused]);
  
  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <View style={{flex:1}}>
        <ProjectListComponent data = {data}
                              viewProjectCallback = {viewProjectCallback}
                              viewButtonsCallback = {viewProjectCallback}
                              />
    </View>
  );
}

function SponsoredProjects ({navigation}) {
  return(
    <View style={styles.container}>
      <Text>Sponsored projects</Text>
    </View>
  );
}

function SeerProjects({navigation}) {
const [data, setData] = React.useState([]);
const isFocused = useIsFocused();

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
    Client.getViewProjects(token).then((resp) =>{
      var copy = [];
      resp.forEach((element) =>{
        var newElement = {};
        newElement.id = element.id.toString();
        newElement.title = element.title;
        newElement.icon = element.icon;
        copy.push(newElement);
      });
      setData(copy);
    }).catch((error) => {
       if(error != 401) console.log('Error:' + error)
    });
    }).catch((error) => {
       console.log(Auth.errorMessageTranslation(error));
    });
  }, [isFocused]);
  
  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  return (
    <View style={{flex:1}}>
        <ProjectListComponent data = {data}
                              viewProjectCallback = {viewProjectCallback}
                              viewButtonsCallback = {viewProjectCallback}
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

export {FavouriteProjects, MyProjects, SponsoredProjects, SeerProjects}