import * as React from 'react';
import { View } from 'react-native';
import { useTheme, Avatar, Button,Text, TextInput, List, Searchbar, RadioButton, Appbar } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { ProjectListComponent } from './../components/ProjectListComponent.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNPickerSelect from 'react-native-picker-select';
import {CategoryPickerComponent} from '../components/CategoryPickerComponent.js'
import {StagePickerComponent} from '../components/StagePickerComponent.js'

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
    setLocation('');
    setStage('');
    setType('');
  }

  const performSearch = () => {
    setVisibleMenu(false);
    setLocation('');
    setStage('');
    setType('');

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
          <View style={{justifyContent:'center', marginLeft: '10%', maxWidth: '80%', flex:2, marginBottom:35, marginTop:35}}>
            <View style={{flex:0.5}}><CategoryPickerComponent setType = {setType}/></View>
            <View style={{flex:0.5}}><StagePickerComponent setStage = {setStage}/></View> 
            <GooglePlacesAutocomplete
                  onPress={(data, details = null) => {
                      setLocation(data.description);
                  }}
                  query={{
                      key: 'AIzaSyDlPVGnR9jYlGObED64_d5HMO88YN0yz5A',
                      language: 'es',
                  }}
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
          </View>
        }

        <Button mode='contained' onPress={performSearch} style={{marginHorizontal:'30%', marginVertical:15, marginTop:-35}}> Buscar </Button>
  
        <ProjectListComponent data = {data}
          viewProjectCallback = {viewProjectCallback}
          viewButtonsCallback = {viewProjectCallback}
        />
      </View>
      );
}

export {Search}