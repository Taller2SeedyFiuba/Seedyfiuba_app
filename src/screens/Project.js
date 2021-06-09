import * as React from 'react';
import { View, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Text, Avatar, Button, Card, Paragraph } from 'react-native-paper';
import { NewProject } from './NewProject.js'
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
const LeftContent = props => <Avatar.Icon {...props} icon='folder' />

function renderItem({item}){
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={item.title} left={LeftContent} />
        <Card.Content>
          <Card.Cover source={{ uri: item.icon }} />
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

function MyProjects () {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
    Client.getProjectsMe(token).then((resp) =>{
      var copy = [];
      var newElement = {};
      resp.forEach((element) =>{
        newElement.id = element.id.toString();
        newElement.title = element.title;
        newElement.icon = element.icon;
        newElement.description = element.title;
        copy.push(newElement);
      });
      setData(copy);
    });
    }).catch((error) => {
       console.log(Auth.errorMessageTranslation(error));
    });
  }, [])
  return (
    <View>
      <Button
          mode="contained"
          onPress={() => {
          const message = {
            "title": "Miau proyecto",
            "description": "Este proyecto forma parte de una prueba de integración.",
            "type": "art",
            "finishdate": "3000-03-03",
            "sponsorshipagreement": "Miau Miau Miau Miau Miau",
            "seeragreement": "Miau Miau Miau",
            "location": {
              "lat": 9999,
              "lng": 9999
            },
            "tags": [
              "Gatitos",
              "Cats",
              "Miau"
            ],
            "multimedia": [
              "https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/5937e90a5bafe882f5bc09e6/gatitos-cesta_0.jpg",
              "https://www.hola.com/imagenes/estar-bien/20180925130054/consejos-para-cuidar-a-un-gatito-recien-nacido-cs/0-601-526/cuidardgatito-t.jpg",
              "https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/Purina%C2%AE%20Como%20elegir%20un%20nuevo%20gatito.jpg?itok=WOC5m4KQ"
            ]
          }
          Auth.getIdToken(true).then((token) => {
            Client.sendNewProject(token, message).then(() =>{
               console.log('Exito');
             }).catch((error) => {
               console.log(Auth.errorMessageTranslation(error));
              });
            });
          }} //navigation.navigate('NewProyect')
          size={30}
          style={{margin:'10%'}}
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