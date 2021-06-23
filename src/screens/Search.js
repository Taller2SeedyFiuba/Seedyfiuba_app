import * as React from 'react';
import { View } from 'react-native';
import { useTheme, Avatar, Button,Text, TextInput, List, Searchbar, RadioButton, Appbar } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { ProjectListComponent } from './../components/ProjectListComponent.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNPickerSelect from 'react-native-picker-select';
import {CategoryPickerComponent} from '../components/CategoryPickerComponent.js'

function Search ({navigation}) {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [tags, setTags] = React.useState('');
  const [option, setOption] = React.useState('Proyect Geographic')
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState('');
  const [type, setType] = React.useState(''); 
  const [stage, setStage] = React.useState(''); 
   const theme = useTheme();

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

/*
  const query = {
      tags : ['Frio'],
      limit : 1,
      page : 0
    };
*/

  const switchMenu = () => {
    setVisibleMenu(!visibleMenu);
    setLocation('')
    setStage('')
    setType('')
  }

  const performSearch = () => {
    const query = {};

    if (tags != '')  query.tags = tags.split(" ");
    if (stage != '') query.stage = stage;
    console.log(stage)
    if (type != '')  query.type = type;
    if (location != ''){
      query.location = location;
      query.lng = 0;
      query.lat = 0;
      query.dist = 0;
    }
    
    //revisar
    query.page = 0;
    query.limit = 5;
    console.log(query)

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
        }).catch((error) => {console.log('')});
        }).catch((error) => {
           console.log(Auth.errorMessageTranslation(error));
        });
  }
    return(
    <View style={{justifyContent:'center', flex:1}}>
    <Appbar.Header style={{height:50}}>
      <Appbar.Content title='Búsqueda'/>
    </Appbar.Header>
      <View style={{justifyContent:'flex-start', marginLeft: '10%', maxWidth: '80%'}}>
      <View style={{justifyContent:'center', flexDirection: 'row'}}>
        <Searchbar
          placeholder='Buscar'
          onChangeText={tags => setTags(tags)}
          value={tags}
        />
        <Button mode='contained' onPress={switchMenu}> Otros </Button>
      </View>
      {visibleMenu && <View style={{justifyContent:'flex-start', backgroundColor : theme.colors.card, marginVertical : 10, flex : 3}}>
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
                <View style={{justifyContent:'left', flexDirection: 'row'}}>
                  <Avatar.Icon size={24} icon="cube" />
                  <Text> Categoría: </Text>
                    <CategoryPickerComponent setType = {setType}/>
                </View>
                <View style={{justifyContent:'left', flexDirection: 'row'}}>
                <Avatar.Icon size={24} icon="clock-time-four-outline" />
                <Text> Fase: </Text>
                <RNPickerSelect
                    onValueChange={stage => setStage(stage)}
                    placeholder={{
                        label: 'Cualquiera',
                        value: '',
                        color: '#9EA0A4',
                    }}
                    items={[
                        { label: 'Cancelado' , value: 'cancelled' },
                        { label: 'En curso'  , value: 'in_progress' },
                        { label: 'Completado', value: 'completted' },
                    ]}
                />
                </View>
      </View>}
      <Button mode='contained' onPress={performSearch}> Buscar </Button>
    </View>
    <ProjectListComponent data = {data}
                                  viewProjectCallback = {viewProjectCallback}
                                  viewButtonsCallback = {viewProjectCallback}
                                  />
    </View>
    );
}

export {Search}