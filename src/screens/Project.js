import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Text, Avatar, Button, Card, Paragraph } from 'react-native-paper';
import { NewProject } from './NewProject.js'
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';

function uploadImagesUri(images){
  var images_url = [];
  images.forEach((image) => {
    Auth.uploadImageAsync(image.uri).then((imageUrl) => {
        images_url.push(imageUrl);
    });
  })
  return images_url;
};

function renderItem({item}){
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={item.title}/>
        <Card.Content>
          <Card.Cover source={{ uri: item.icon }} />
        </Card.Content>
      </Card>
    </View>
  );
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
  return (
    <View style={{flex:1}}>
      <Button
          mode="contained"
          onPress={() => {
          const message = {
            "title": "Salvemos a la antártida",
            "description": "Este proyecto forma parte de una segunda prueba de integración.",
            "type": "art",
            "finishdate": "3000-03-03",
            "sponsorshipagreement": "Miau Miau Miau Miau Miau",
            "seeragreement": "Miau Miau Miau",
            "location": {
              "lat": 9999,
              "lng": 9999
            },
            "tags": [
              "Frio",
              "Disputa Politica",
              "Aliens"
            ],
            "multimedia": [
              "https://www.elagoradiario.com/wp-content/uploads/2019/12/Continente-art%C3%A1rtico-1140x600.jpg",
              "https://dialogochino.net/wp-content/uploads/2018/10/argentina-antarctic-1440x720.jpg",
              "https://naturaliza-pre.ecoembes.com/wp-content/uploads/2020/03/deshielo.png"
            ]
          }
          Auth.getIdToken(true).then((token) => {
            Client.sendNewProject(token, message).then(() =>{
               console.log('Exito');
             }).catch((error) => {
               console.log(Auth.errorMessageTranslation(error));
              });
            });
          }} 
          onPress={() => navigation.dangerouslyGetParent().navigate('NewProject')} // comentar para usar lo de arriba
          size={30}
          style={{margin:'5%'}}
          icon="plus-box"
        >
        Crear Proyecto
        </Button>
      <FlatList
        data={data}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
        //extraData={selectedId}
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