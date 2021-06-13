import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Text, Divider, Button, Card, IconButton } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { NewProject } from './NewProject.js';
import { ProjectListComponent } from './../components/ProjectListComponent.js';

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
    });
    }).catch((error) => {
       console.log(Auth.errorMessageTranslation(error));
    });
  }, [])
  
  const viewProjectCallback = (id) => {
    navigation.dangerouslyGetParent().navigate('ProjectInfo', {projectId : id});
  };

  return (
    <View style={{flex:1}}>
        <Button
          mode="contained"
          onPress={() => navigation.dangerouslyGetParent().navigate('NewProject')}
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

function FavouriteProjects () {
  return (
    <View style={styles.container}>
      <Text>Favourite projects</Text>
    </View>
  );
}

function SponsoredProjects () {
  return(
    <View style={styles.container}>
      <Text>Sponsored projects</Text>
    </View>
  );
}

function SeerProjects() {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <Text>Seer projects</Text>
    </View>
  )
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