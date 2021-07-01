import * as React from 'react';
import { Image, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { IconButton, Button, Text, Avatar, TextInput, Divider, ProgressBar, Subheading, Appbar, Portal, Dialog, Paragraph } from 'react-native-paper';
import * as Auth from '../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';
import { useIsFocused } from '@react-navigation/native';

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

function firstUpperCase(element) {
    return element.charAt(0).toUpperCase() + element.slice(1)
}

function renderMediaItem({item}){
    return (
        <View>
            <Image source={{uri: item.content}} style={{ width: 400, height : 300 }}/>
        </View>
    );
};

function renderTags({item}) {
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

function StageButton(props) {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    
    return(
        <View>
            <Button
                mode="outlined"
                onPress={showDialog}
                style={{margin: 15}}
            >
                {props.title}
            </Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Etapa</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Titulo: {props.title}</Paragraph>
                    <Paragraph>Importe: {props.amount}</Paragraph>
                    <Paragraph>Descripción: {props.description}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

function renderStages({item}) {
    return (
        <View>
            <StageButton 
                title={item.content.title} 
                amount={item.content.amount} 
                description={item.content.description}
            />
        </View>
    );
}

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
    const [dummy, setDummy] =  React.useState(false);
    const {projectId} = route.params;
    const [project, setProject] = React.useState({
          id: 0,
          ownerid: '',
          title: '',
          description: '',
          type: '',
          state: '',
          actualstage: 0,
          creationdate: '',
          location: {
            description: '',
            lat: 120,
            lng: 40
          },
          totalamount: 0,
          fundedamount: 0,
          sponsorscount: 0,
          favouritescount: 0,
          isfavourite: false,
          tags: [],
          multimedia: [],
          stages: [],
    });
    const [user, setUser] = React.useState({
        firstname: '',
        lastname : ''
    });
    const isFocused = useIsFocused();

    React.useEffect(() => {
        if(isFocused){
            Auth.getIdToken(true).then((token) => {
            Client.getProjectsID(token, projectId).then((responseProject) => {
            responseProject.tags = arrayToIncrementalKey(responseProject.tags);
            responseProject.multimedia = arrayToIncrementalKey(responseProject.multimedia);
            responseProject.stages = arrayToIncrementalKey(responseProject.stages);
            responseProject.type = firstUpperCase(responseProject.type);
            setProject(responseProject);
            Client.getOtherUserData(token, responseProject.ownerid).then((responseUser) => {
                    setUser(responseUser);     
                }).catch((error) => {
                    console.log(error);
                });    
            }).catch((error) => {
                console.log(error);
            });
    }).catch((error) => {
                console.log(error);
    });
    }
    }, [isFocused]);

    const favouriteProject = () => {
        if(project.isfavourite) return;
        Auth.getIdToken(true).then((token) => {
            Client.sendFavouriteProject(token, projectId).then((response) => {
                const copy = project;
                copy.isfavourite = true;
                setProject(copy);
                setDummy(!dummy);
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

    const viewUser = () => {
        if(project.hasOwnProperty('ownerid')){
            navigation.navigate('OtherAccount', {userId : project.ownerid});
        }
    };

    return (
        // AGREGAR BOTON PATROCINAR
        // PONER LINDO FAVORITO, PATROCINAR Y EL IMPORTE
        // PONER LINDO UBICACION, AUTOR, CATEGOR
        // MOVER SUPERVISAR
        // ACOMODAR UN POCO TODO
        // RASTREAR PROBLEMAS DE project
        //
        <View style={{flex:1}}>
            <Appbar.Header style={{height:50}}>
                <Appbar.BackAction onPress={() => navigation.navigate("HomeRoute")} />
                <Appbar.Content title={project.title}/>
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={{height : 400}}>
                    <FlatList
                        data={project.multimedia}
                        renderItem={item => renderMediaItem(item)}
                        keyExtractor={item => item.key}
                        horizontal = {true}
                    />
                </View>

                <Divider style={{margin:20}}/>
                
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: 'center', flex:1}}>
                    <Avatar.Icon size={24} icon="tag"/>
                    <Text style={{padding:5}}>{project.type}</Text>
                    <Avatar.Icon size={24} icon="account-cash"/> 
                    <Text> Sponsors: {project.sponsorscount} </Text>
                    <Avatar.Icon size={24} icon="star"/> 
                    <Text> Favoritos: {project.favouritescount} </Text>
                    <IconButton size={24} icon= {(project.isfavourite) ? 'star' : 'star-outline'} onPress={favouriteProject} animated={true}/>
                </View>

                <Divider style={{margin:20}}/>

                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                </View>

                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Avatar.Icon size={24} icon="account"/>
                    <Text style={{padding:5}}>Autor: {user.firstname + ' ' + user.lastname}</Text>
                    <IconButton icon='account-arrow-right' onPress={viewUser}/>
                </View>
                
                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom:20}}>
                    <Avatar.Icon size={24} icon="earth"/>
                    <Text style={{padding:5}}>{project.location.description}</Text>
                </View>

                <Button onPress={viewProject}> DEBUG: Supervisar </Button>

                <ProgressBar progress={project.fundedamount / project.totalamount} style={{marginVertical:15}}/>
                
                <View style={{flex:1, flexDirection: "row", justifyContent: "flex-start", alignContent: "center"}}>
                        <Avatar.Icon size={24} icon="cash"/>
                        <Text> { project.fundedamount + '/' +  project.totalamount} </Text>
                </View>
                
                
                <Divider style={{margin:20}}/>
                
                <Subheading style={{marginBottom:15}}>Descripcion</Subheading>
    
                <TextInput
                    style={{cont:"flex-start"}}
                    multiline={true}
                    value={project.description}
                    disabled={true}
                />

                <Divider style={{margin:20}}/>

                <Subheading style={{marginBottom:15}}>Fases</Subheading>

                <View style={{height : 100}}>
                    <FlatList
                        data={project.stages}
                        renderItem={item => renderStages(item)}
                        keyExtractor={item => item.key}
                        horizontal = {true}
                    />
                </View>

                <Subheading style={{marginBottom:15}}>Tags</Subheading>

                <View>
                    <FlatList
                        data={project.tags}
                        renderItem={item => renderTags(item)}
                        keyExtractor={item => item.key}
                        horizontal = {true}
                    />
                </View>
            </ScrollView>
        </View>
    )
};