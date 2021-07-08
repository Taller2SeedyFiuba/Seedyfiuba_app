import * as React from 'react';
import { View } from 'react-native';
import { useTheme, Button, TextInput, Searchbar, Appbar } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
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
  const [type, setType] = React.useState(''); 
  const [stage, setStage] = React.useState(''); 
  const [page, setPage] = React.useState(1);
  const limit = 5;
  const [data, setData] = React.useState([]);
  const theme = useTheme();

  const viewProjectCallback = (id) => {
    navigation.navigate('ProjectInfo', {projectId : id});
  };

  const returnDisabled = () => {
    return page == 1;
  }

  const nextDisabled = () => {
    return data.length < limit;
  }
  
  const onPressReturn = () => {
    setPage(page - 1);
    setQuery({...query, page: page});
    performSearch();
  }

  const onPressNext = () => {
    setPage(page + 1);
    setQuery({...query, page: page});
    performSearch();
  }

  const switchMenu = () => {
    setVisibleMenu(!visibleMenu);
    setLocation('');
    setStage('');
    setType('');
  }

  const setQueryParams = () => {
    setVisibleMenu(false);
    setTags('');
    setLocation('');
    setStage('');
    setType('');

    let newQuery = {};
    
    //revisar
    newQuery.page = page;
    newQuery.limit = limit;
    if (tags != '')  newQuery.tags = tags.split(" ");
    if (stage != '') newQuery.stage = stage;
    if (type != '')  newQuery.type = type;
    if (location != ''){
      newQuery.lng = longitud;
      newQuery.lat = latitud;
      newQuery.dist = 500;
    }

    setQuery(newQuery);
    console.log("newQuery:", newQuery);
  }

  const performSearch = () => {
    console.log(query);
    Auth.getIdToken(true).then((token) => {
      Client.getSearchProject(token, query).then((resp) => {
        var copy = [];
        resp.forEach((element) =>{
          var newElement = element;
          newElement.id = element.id.toString();
          copy.push(newElement);
        });
        setData(copy);
      }).catch((error) => {console.log('')});
    }).catch((error) => {
        console.log(Auth.errorMessageTranslation(error));
    });
    }

  const performFirstSearch = () => {
    setQueryParams();
    performSearch();
  }
  
  return(
    <View style={{justifyContent:'center', flex:1}}>
      <Appbar.Header style={{height:50}}>
        <Appbar.Content title='Búsqueda'/>
      </Appbar.Header>

      <View style={{justifyContent:'flex-start', marginLeft: '10%', maxWidth: '80%', flex:0.3}}>
        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:15, alignItems:'center'}}>
          <Searchbar
            placeholder='Buscar'
            style={{flex:1, marginRight:10}}
            onChangeText={tags => setTags(tags)}
            value={tags}
          />
          <Button mode='contained' onPress={switchMenu}> ... </Button>
        </View>
      </View>

      {
        visibleMenu &&
        <View style={{justifyContent:'center', marginLeft: '10%', maxWidth: '80%', flex:1, marginBottom:35, marginTop:35}}>
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
                    multiline:true,
                    style:{marginVertical:15, flex:1},
                    value: location,
                    onChangeText: location => setLocation(location),
                    left:<TextInput.Icon name='earth'/>,
                  }}
                />
          <View style={{flex:0.5}}><CategoryPickerComponent setType = {setType} value={type}/></View>
          <View style={{flex:0.5}}><StagePickerComponent setStage = {setStage} value={stage}/></View> 
        </View>
      }

      <Button mode='contained' onPress={() => {performFirstSearch();}} style={{marginHorizontal:'30%', marginVertical:15, marginTop:-35}}> Buscar </Button>

      <ProjectListComponent 
        data = {data}
        page = {page}
        viewProjectCallback = {viewProjectCallback}
        viewButtonsCallback = {viewProjectCallback}
        returnDisabled = {returnDisabled()}
        nextDisabled = {nextDisabled()}
        onPressReturn = {onPressReturn}
        onPressNext = {onPressNext}
      />
    </View>
  );
}

export {Search}