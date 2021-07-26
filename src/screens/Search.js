import * as React from 'react';
import { View } from 'react-native';
import { useTheme, Button, TextInput, Searchbar, Appbar, Text } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import Slider from '@react-native-community/slider';
import { ProjectListComponent } from './../components/ProjectListComponent.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {CategoryPickerComponent} from '../components/CategoryPickerComponent.js'
import {StagePickerComponent} from '../components/StagePickerComponent.js'

function Search ({navigation}) {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [tags, setTags] = React.useState('');
  const [query, setQuery] = React.useState({});
  const [location, setLocation] = React.useState('');
  const [latitud, setLatitud] = React.useState(Infinity);
  const [longitud, setLongitud] = React.useState(Infinity);
  const [distance, setDistance] = React.useState(250);
  const [type, setType] = React.useState(''); 
  const [state, setState] = React.useState(''); 
  const [isLocationFocused, setIsLocationFocused] = React.useState(false);
  const theme = useTheme();
  
  const searchFunction = (token, limit, page) => {
    return Client.getSearchProject(token, query, limit, page);
  }

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  const switchMenu = () => {
    setVisibleMenu(!visibleMenu);
    setLocation('');
    setState('');
    setType('');
    setDistance(250);
  }

  const setQueryParams = () => {
    let newQuery = {};
    
    if (tags != '')  newQuery.tags = tags.split(" ");
    if (state != '') newQuery.state = state;
    if (type != '')  newQuery.type = type;
    if (location != ''){
      newQuery.lng = longitud;
      newQuery.lat = latitud;
      newQuery.dist = (distance != 0) ? distance : 10;
    }

    setQuery(newQuery);
    setVisibleMenu(false);
    setTags('');
    setLocation('');
    setState('');
    setType('');
    setDistance(250);
  }

  const performFirstSearch = () => {
    setQueryParams();
  }
  
  return(
    <View style={{flex:1}}>
    <Appbar.Header style={{height:50}}>
      <Appbar.Content title='Búsqueda'/>
    </Appbar.Header>

      <View style={{justifyContent:'flex-start', marginLeft: '10%', maxWidth: '80%'}}>
        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:15, alignItems:'center'}}>
          <Searchbar
          placeholder='Buscar'
          style={{marginRight : 10}}
          onChangeText={tags => setTags(tags)}
          value={tags}
          />
          <Button mode='contained' onPress={switchMenu}> ... </Button>
        </View>
      </View>

      {visibleMenu &&
      <View style={{justifyContent:'center', marginLeft: '10%', maxWidth: '80%'}}>
        <View style={{marginBottom:10}}><CategoryPickerComponent setType = {setType} value={type}/></View>
        <View style={{marginBottom:10}}><StagePickerComponent setStage = {setState} value={state}/></View> 
        <View style= {(isLocationFocused) ? {height : 220} : {height : 50}}>
        <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          setLocation(data.description);
          setLatitud(details.geometry.location.lat);
          setLongitud(details.geometry.location.lng);
        }}
        query={{
          key: 'AIzaSyDlPVGnR9jYlGObED64_d5HMO88YN0yz5A',
          language: 'es',
        }}
        fetchDetails={true}
        textInputProps={{
          InputComp: TextInput,
          label:'Ubicacion',
          mode:'outlined',
          dense:true,
          multiline: true,
          style:{marginVertical:15, flex:1},
          value: location,
          onChangeText: location => setLocation(location),
          onFocus: () => setIsLocationFocused(true),
          onBlur: () => setIsLocationFocused(false),
          left:<TextInput.Icon name='earth'/>,
        }}
        />
        </View>
        <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
        <Text>Distancia</Text>
        <Slider
          style={{marginVertical: '10%', width:'70%'}}
          minimumValue={50}
          maximumValue={1500}
          step={50}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={250}
          onValueChange={value => setDistance(value)}
        />
        <Text>{distance} km</Text>
        </View>
      </View>
      }
      <Button mode='contained' onPress={() => {performFirstSearch();}} style={{marginHorizontal:'30%'}}> Buscar </Button>
      <ProjectListComponent 
      viewProjectCallback = {viewProjectCallback}
      searchFunction = {searchFunction}
      update = {query}
      />
    </View>
  );
}

export {Search}