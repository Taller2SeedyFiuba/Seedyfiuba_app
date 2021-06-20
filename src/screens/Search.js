import * as React from 'react';
import { View } from 'react-native';
import { Button,Text, TextInput, List, Searchbar, RadioButton, Appbar } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { ProjectListComponent } from './../components/ProjectListComponent.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function Search ({navigation}) {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [option, setOption] = React.useState('Proyect Geographic')
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState('');

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  const query = {
      tags : ['Frio'],
      limit : 1,
      page : 0
    };

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
    Client.getSearchProject(token, query).then((resp) =>{
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

    return(
    <View style={{justifyContent:'center', flex:1}}>
    <Appbar.Header style={{height:50}}>
      <Appbar.Content title='Búsqueda'/>
    </Appbar.Header>
      <View style={{justifyContent:'flex-start', marginLeft: '10%', maxWidth: '80%'}}>
      <View style={{justifyContent:'center', flexDirection: 'row'}}>
        <Searchbar
          placeholder='Buscar'
          onChangeText={searchQuery => setSearchQuery(searchQuery)}
          value={searchQuery}
        />
        <Button mode='contained' onPress={() => setVisibleMenu(!visibleMenu)}> : </Button>
      </View>
      {visibleMenu && <View style={{justifyContent:'flex-start', flex:3}}>
                <GooglePlacesAutocomplete // ARREGLAR, NO FUNCIONA
                    onPress={(data, details = null) => {
                        setLocation(data.description);
                    }}
                    query={{
                        key: 'AIzaSyDlPVGnR9jYlGObED64_d5HMO88YN0yz5A',
                        language: 'en',
                    }}
                    textInputProps={{
                        InputComp: TextInput,
                        label:'Ubicacion',
                        mode:'outlined',
                        dense:true,
                        style:{marginVertical:15, flex:1},
                        value: location,
                        onChangeText: location => setLocation(location),
                        left:<TextInput.Icon name='earth'/>,
                      }}
                />
        <List.Section title='Tipo de Búsqueda'>
          <RadioButton.Group
          value={option}
          onValueChange={value  => setOption(value)}>
          <RadioButton.Item label='Proyecto (Ubicación)' value='Proyect Geographic' mode='android' />
          <RadioButton.Item label='Proyecto (Tipo)' value='Proyect Stage' mode='android' />
          <RadioButton.Item label='Proyecto (Etapa)' value='Proyect Hashtag' mode='android' />
          <RadioButton.Item label='Proyecto (Hashtag)' value='Proyect Type' mode='android' />
          <RadioButton.Item label='Usuario' value='User' mode='android' />
          </RadioButton.Group>
        </List.Section>
      </View>}
    </View>
    <ProjectListComponent data = {data}
                                  viewProjectCallback = {viewProjectCallback}
                                  viewButtonsCallback = {viewProjectCallback}
                                  />
    </View>
    );
}

export {Search}