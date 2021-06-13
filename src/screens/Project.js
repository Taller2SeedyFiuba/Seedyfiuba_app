import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Text, Divider, Button, Card, IconButton } from 'react-native-paper';
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

function renderItem({flatItem, navigation}){
  console.log(item, navigation);
  const item = flatItem.item;
  return (
    <View style={styles.container}>
      <Card onPress={() => {navigation.dangerouslyGetParent().navigate('ProjectInfo', {projectId : item.id})}}>
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
          onPress={() => navigation.dangerouslyGetParent().navigate('NewProject')}
          size={30}
          style={{margin:'5%'}}
          icon="plus-box"
        >
        Crear Proyecto
        </Button>
      <FlatList
        data={data}
        renderItem={(flatItem) => renderItem({flatItem, navigation})}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
            <IconButton
              icon='chevron-double-left'
              size={36}
              onPress={() => alert("Soy un boton!")}
              //disabled={} // Usar para desactivar el botón cuando no hay más paginas
            />
            <IconButton
              icon='chevron-left'
              size={36}
              onPress={() => alert("Soy un boton!")}
              //disabled={} // Usar para desactivar el botón cuando no hay más paginas
            />
            <View style={{marginRight:15, height:1, width:'5%', backgroundColor:'#000000', alignSelf:'center'}}/>
            <Text style={{fontSize:28, alignSelf:'center'}}>
              1
            </Text>
            <View style={{marginLeft:15, height:1, width:'5%', backgroundColor:'#000000', alignSelf:'center'}}/>            
            <IconButton
              icon='chevron-right'
              size={36}
              onPress={() => alert("Soy un boton!")}
              //disabled={} // Usar para desactivar el botón cuando no hay más paginas
            />
            <IconButton
              icon='chevron-double-right'
              size={36}
              onPress={() => alert("Soy un boton!")}
              //disabled={} // Usar para desactivar el botón cuando no hay más paginas
            />
          </View>
        }
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