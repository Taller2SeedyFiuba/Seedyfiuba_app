import * as React from 'react';
import { Image, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Avatar, TextInput, Divider, ProgressBar, Subheading, Appbar } from 'react-native-paper';
import * as Auth from '../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';

const styles = StyleSheet.create({
    container: {
      
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

  function renderStageItem({item}){
    return (
        <View>
            <Text> {item.content.title} </Text>
            <Text> {item.content.amount} </Text>
            <Text> {item.content.description} </Text>  
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
    const {projectId} = route.params;
    const [resp, setResp] = React.useState({});

    React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
        Client.getProjectsID(token, projectId).then((response) => {
            response.tags = arrayToIncrementalKey(response.tags);
            response.multimedia = arrayToIncrementalKey(response.multimedia);
            response.stages = arrayToIncrementalKey(response.stages);
            setResp(response);      
        }).catch((error) => {
            console.log(error);
        });
    });
    }, []);

    const favouriteProject = () => {
        Auth.getIdToken(true).then((token) => {
            Client.sendFavouriteProject(token, projectId).then((response) => {
        }).catch((error) => {
            console.log(error);
        });
        });
    };

    const viewProject = () => {
        Auth.getIdToken(true).then((token) => {
            Client.sendViewProject(token, projectId).then((response) => {
        }).catch((error) => {
            console.log(error);
        });
        });
    };

    return (
        <View style={{flex:1}}>
            <Appbar.Header style={{height:50}}>
                <Appbar.Content title={resp.title}/>
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={{height : 400}}>
                    <FlatList
                        data={resp.multimedia}
                        renderItem={item => renderMediaItem(item)}
                        keyExtractor={item => item.key}
                        horizontal = {true}
                    />
                </View>

                <Divider style={{margin:20}}/>

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
                <Button onPress={favouriteProject}> Favorito </Button>
                <Button onPress={viewProject}> Supervisar </Button>
                <ProgressBar progress={0.5} style={{marginBottom:10}}/>
                
                <Text style={{marginBottom:20}}>Importe</Text>
                
                <Divider style={{margin:20}}/>
                
                <Subheading style={{marginBottom:15}}>Fases</Subheading>

                <View style={{height : 100}}>
                    <FlatList
                        data={resp.stages}
                        renderItem={item => renderStageItem(item)}
                        keyExtractor={item => item.key}
                        horizontal = {true}
                    />
                </View>

                <Subheading style={{marginBottom:15}}>Descripcion</Subheading>

                <TextInput
                style={{cont:"flex-start"}}
                multiline={true}
                value={resp.description}
                disabled={true}
                />

                <Subheading style={{marginTop:35}}>Tags</Subheading>

                <View>
                    <FlatList
                        data={resp.tags}
                        renderItem={item => renderTagItem(item)}
                        keyExtractor={item => item.key}
                        horizontal = {true}
                    />
                </View>
            </ScrollView>
        </View>
    )
};