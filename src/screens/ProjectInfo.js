import * as React from 'react';
import { Image, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Text, Title, Avatar, IconButton, TextInput, Divider, ProgressBar, Subheading } from 'react-native-paper';
import { ImagePickerComponent } from '../components/ImagePickerComponent.js';
import * as Auth from '../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: '10%',
      maxWidth: '80%',
    },
    scrollView: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: '10%',
      maxWidth: '80%',
      marginHorizontal: 0,
    } ,
    title: {
      fontSize: 32,
    },
  })

  function renderMediaItem({item}){
    return (
        <View>
            <Image source={{uri: item.content}} style={{ width: 300, height : 400 }}/>
        </View>
    );
};

  function renderTagItem({item}){
    return (
        <View>
            <TextInput
            disabled={true}
            mode='outlined'
            dense={true}
            style={{margin:15}}
            value={item.content}
            />
        </View>
    );
};

function arrayToIncrementalKey(array){
    var i = 0;
    const formatedArray = []; 
    array.forEach((element) => {
        formatedArray.push({key : i.toString() , content : element});
        i++;
    });
    return formatedArray;
}

export function ProjectInfo({route, navigation}) {
    //const {projectID} = route.params;
    const projectId = '5';
    const [resp, setResp] = React.useState({});

    React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
        Client.getProjectsID(token, projectId).then((response) =>{
        response.tags = arrayToIncrementalKey(response.tags);
        response.multimedia = arrayToIncrementalKey(response.multimedia);

        setResp(response);
    }).catch((error) => {
        console.log(error);
    });
    });
    }, [])

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
            <Title> {resp.title} </Title>
            </View>
            <View style={{height : 400}}>
                <FlatList
                    data={resp.multimedia}
                    renderItem={item => renderMediaItem(item)}
                    keyExtractor={item => item.key}
                    horizontal = {true}
                    //extraData={selectedId}
                />
            </View>
            <View 
            style={{flexDirection: "row", justifyContent: "center", marginBottom:20}}
            >

                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Avatar.Icon size={24} icon="tag"/>
                    <Text style={{padding:5}}>{resp.type}</Text>
                </View>
                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Avatar.Icon size={24} icon="earth"/>
                    <Text style={{padding:5}}>Ubicacion</Text>
                </View>
                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Avatar.Icon size={24} icon="account"/>
                    <Text style={{padding:5}}>Autor</Text>
                </View>
            </View>

            <Text style={{marginBottom:10}}>Fase: {resp.stage}</Text>
            
            <ProgressBar progress={0.5} style={{marginBottom:10}}/>
            
            <Text style={{marginBottom:20}}>Importe</Text>
            
            <Divider style={{margin:20}}/>
            
            {/* <View 
            style={{flexDirection: "row", alignItems: "center"}}
            > */}
              <Subheading style={{marginBottom:10}}>Descripcion</Subheading>
              {/* <IconButton size={24} icon="pencil" onPress={() => alert("Pressed")}/> */}
            {/* </View> */}

            <TextInput
            style={{height:100, cont:"flex-start"}} // ARREGLAR EL CONTENIDO, TAMAÑO, JUSTIFICACION, ETC
            multiline={true}
            value={resp.description}
            />

            <Subheading style={{marginTop:30}}>Tags</Subheading>

            <View>
                <FlatList
                    data={resp.tags}
                    renderItem={item => renderTagItem(item)}
                    keyExtractor={item => item.key}
                    horizontal = {true}
                    //extraData={selectedId}
                />
            </View>
        </ScrollView>
    )
};