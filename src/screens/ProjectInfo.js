import * as React from 'react';
import { Image, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Badge, Title, Card, IconButton, Button, Text, Avatar, TextInput, Divider, 
    ProgressBar, Subheading, Appbar, Portal, Dialog, Paragraph, HelperText } from 'react-native-paper';
import * as Auth from '../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';
import { useIsFocused } from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

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
        <View style={{marginBottom:25}}>
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
    const theme = useTheme();

    return(
        <View>
            <Button
                mode='outlined'
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


/*
<StageButton 
                title={item.content.title} 
                amount={item.content.amount} 
                description={item.content.description}
            />

*/

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
    const [isViewing, setIsViewing] =  React.useState(false);
    const [isViewer, setIsViewer] =  React.useState(false);
    const theme = useTheme();
    const {projectId} = route.params;
    const [dummy, setDummy] =  React.useState(false);
    const [editDescription, setEditDescription] = React.useState('');
    const [descriptionErrorInfo, setDescriptionErrorInfo] = React.useState('');
    const [transferErrorInfo, setTransferErrorInfo] = React.useState('');
    const [viewerErrorInfo, setViewerErrorInfo] = React.useState('');
    const [visibleDescriptionDialog, setVisibleDescriptionDialog] = React.useState(false);
    const [visibleTransferDialog, setVisibleTransferDialog] = React.useState(false);
    const [update, setUpdate] = React.useState(false);
    const [transferAmount, setTransferAmount] = React.useState('');
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
          mine: false
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
                
                Client.getOtherUserData(token, responseProject.ownerid).then((responseUser) => {
                        setUser(responseUser);
                        responseProject.mine = (responseProject.ownerid == Auth.getUid());
                        setProject(responseProject);
                        setEditDescription(responseProject.description);
                }).catch((error) => {
                        console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });

            Client.getUserData(token).then((responseMyData) => {
                setIsViewer(responseMyData.isviewer);
            }).catch((error) => {

            });

            Client.getViewProjects(token, 15, 1).then((responseViewData) => {
                console.log(responseViewData);
                setIsViewing(
                    (typeof(responseViewData.find(element => {return element.id == projectId})) != 'undefined')
                );
            }).catch((error) => {
               console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
        }
    }, [isFocused, update]);

    const favouriteProject = () => {
        if(project.isfavourite) return;
        Auth.getIdToken(true).then((token) => {
            Client.sendFavouriteProject(token, projectId).then((response) => {
                const copy = project;
                copy.isfavourite = true;
                copy.favouritescount += 1;
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
            setUpdate(!update);
        }).catch((error) => {
            if (Math.floor(error / 100) == 5) setViewerErrorInfo('Error interno del servidor. Inténtelo más tarde.');
            setViewerErrorInfo('El estado del proyecto no admite su supervisión.');
        });
        });
    };

    const voteProject = () => {
        Auth.getIdToken(true).then((token) => {
            Client.sendVoteProject(token, projectId, project.actualstage).then((response) => {
            setUpdate(!update);
        }).catch((error) => {
            if (Math.floor(error / 100) == 5) setViewerErrorInfo('Error interno del servidor. Inténtelo más tarde.');
            setViewerErrorInfo('El estado del proyecto no admite su voto.');
        });
        });
    };

    const viewUser = () => {
        if(project.hasOwnProperty('ownerid')){
            navigation.navigate('OtherAccount', {userId : project.ownerid});
        }
    };

    const renderStages = ({item}) => {
        const isActualStage = (/*project.state == 'inProgress' &&*/ project.actualstage == parseInt(item.key))
        const color =  isActualStage ? theme.colors.primary : 'grey';
        return (
            <View style={{ alignItems: 'center', marginBottom: 25, marginLeft: 15}}>
                <Badge size={28} style = {{backgroundColor: color , alignSelf: 'center', marginBottom: 15}}> {parseInt(item.key) + 1} </Badge>
                <Card style={isActualStage ? {width: 200, mode: 'outlined', outlineColor: color, outlineStyle: "solid", outlineWidth: 2} : {width: 200}}>
                    <Card.Content>
                        <Title> {item.content.title} </Title>
                        <Divider style={{marginVertical : 8}}/>
                        <Subheading> {item.content.amount + ' ETH'} </Subheading>
                        <Divider style={{marginVertical : 8}}/>
                        <Paragraph> {item.content.description} </Paragraph>
                    </Card.Content>
                </Card>
            </View>
        );
    }

    const updateDescription = () => {
        if(editDescription.length < 5){
            setDescriptionErrorInfo('La descripción debe contener al menos 5 caracters');
            return;
        }

        const newProjectData = {
            description : editDescription
        }

        Auth.getIdToken(true).then((token) => {
            Client.patchProjectData(token, newProjectData, projectId).then((response) => {
              setVisibleDescriptionDialog(false);
              setDescriptionErrorInfo('');
        }).catch((error) => {
            console.log(error)
          if(Math.floor(error / 4) == 100){
            setDescriptionErrorInfo('Datos inválidos. Revise su solicitud.')
          }else{
            setDescriptionErrorInfo('Error interno del servidor. Inténtelo más tarde.')
          }
        });
        }).catch((error) => {
                console.log(error);
        });

        setUpdate(!update);
    };

    const makeTransfer = () => {

        const transferAmountData = {
            amount: parseFloat(transferAmount)
        }

        Auth.getIdToken(true).then((token) => {
            Client.sendTransferData(token, transferAmountData, projectId).then((response) => {
              setVisibleTransferDialog(false);
              setTransferErrorInfo('');
              setUpdate(!update);
        }).catch((error) => {
          if(Math.floor(error / 4) == 100){
            setTransferErrorInfo('No puede procesarse la transacción en este momento.')
          }else{
            setTransferErrorInfo('Error interno del servidor. Inténtelo más tarde.')
          }
        });
        }).catch((error) => {
                console.log(error);
        });

        setTransferAmount('');
        setVisibleTransferDialog(false);
    }

    return (
        <View style={{flex:1}}>
            <Appbar.Header style={{height:50}}>
                <Appbar.BackAction onPress={() => navigation.navigate('HomeRoute')} />
                <Appbar.Content title={project.title}/>
                <View style={styles.container}>
                    <IconButton size={24} icon= {(project.isfavourite) ? 'star' : 'star-outline'} color={'white'} onPress={favouriteProject} animated={true}/>
                </View>
            </Appbar.Header>


            <ScrollView contentContainerStyle={styles.container}>
                <FlatList
                    data={project.multimedia}
                    renderItem={item => renderMediaItem(item)}
                    keyExtractor={item => item.key}
                    horizontal = {true}
                    style={{marginTop : 15}}
                />

                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex:1, marginTop: 20}}>
                    <View style= {{flexDirection: 'row'}}>
                        <Avatar.Icon size={24} icon='tag'/>
                        <Text style={{padding:5}}>{project.type}</Text>
                    </View>
                    <View style= {{flexDirection: 'row'}}>
                        <Avatar.Icon size={24} icon='account-cash'/> 
                        <Text> {project.sponsorscount} </Text>
                    </View>
                    <View style= {{flexDirection: 'row'}}>
                        <Avatar.Icon size={24} icon='star'/> 
                        <Text> {project.favouritescount} </Text>
                    </View>
                </View>

                <Divider style={{margin:20}}/>

                <TextInput
                    style={{cont:'flex-start'}}
                    multiline={true}
                    value={project.description}
                    disabled={true}
                />

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex:1}}>
                    {project.mine && <IconButton icon='pencil' mode='contained' onPress={() => setVisibleDescriptionDialog(true)}/>}
                </View>

                <Divider style={{margin:20}}/>
                
                <ProgressBar progress={project.fundedamount / project.totalamount} style={{marginVertical:15}}/>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                    <Text> {project.fundedamount} / {project.totalamount} ETH </Text>
                </View>

                <View>
                    <TextInput
                        // CHEQUEAR MINIMO 1
                        label='Monto a transferir'
                        value={transferAmount}
                        placeholder='Max: 9.9999 ETH'
                        onChangeText={newAmount => setTransferAmount(newAmount)}
                        mode='outlined'
                        dense={true}
                        style={{flex:1}}
                        left={<TextInput.Icon name='cash'/>}
                        render={props =>
                        <TextInputMask
                        {...props}
                            type={'custom'}
                            options={{
                                mask: '9.9999'
                            }}
                         />
                       }
                    />

                     <HelperText type='error' visible={() => {transferErrorInfo != ''}}>
                        {transferErrorInfo}
                      </HelperText>

                    <Button mode='contained' onPress={() => {if (transferAmount != '' && transferAmount != '0') setVisibleTransferDialog(true)}}> ¡Patrocionar! </Button>
                </View>

                <Portal>
                    <Dialog visible={visibleDescriptionDialog} onDismiss={() => setVisibleDescriptionDialog(false)}>
                      <Dialog.Title>Editar Descripcion</Dialog.Title>
                      <Dialog.Content>
                        <TextInput
                          style={{cont:'flex-start'}}
                          multiline={true}
                          label= 'Nueva descripción'
                          value={editDescription}
                          onChangeText={(text) => setEditDescription(text)}/>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={() => setVisibleDescriptionDialog(false)}>Cancelar</Button>
                        <Button onPress={updateDescription}>Hecho</Button>
                      </Dialog.Actions>
                      <HelperText type='error' visible={() => {descriptionErrorInfo != ''}}>
                        {descriptionErrorInfo}
                      </HelperText>
                    </Dialog>
                </Portal>

                <Portal>
                    <Dialog visible={visibleTransferDialog} onDismiss={() => setVisibleTransferDialog(false)}>
                      <Dialog.Title>Confirmar transferencia</Dialog.Title>
                      <Dialog.Content>
                        <Text>Se transferirán irreversiblemente {transferAmount} ETH a este proyecto.</Text>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={() => setVisibleTransferDialog(false)}>Cancelar</Button>
                        <Button onPress={makeTransfer}>Continuar</Button>
                      </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Divider style={{margin:20}}/>

                <Subheading style={{marginBottom:15}}>Fases</Subheading>

                <FlatList
                    data={project.stages}
                    renderItem={item => renderStages(item)}
                    keyExtractor={item => item.key}
                    horizontal = {true}
                />

                {isViewer && !isViewing &&
                    <View>
                        <Divider style={{margin:20}}/>
                        <Subheading style={{marginBottom:15}}>Opciones de veedor</Subheading>
                        <Button mode='contained' style={{marginBottom : 10}} onPress={viewProject}> Supervisar </Button>
                        <HelperText type='error' visible={() => {viewerErrorInfo != ''}}>
                            {viewerErrorInfo}
                        </HelperText>
                    </View>
                    
                }

                {isViewer && isViewing &&
                    <View>
                        <Divider style={{margin:20}}/>
                        <Subheading style={{marginBottom:15}}>Opciones de veedor</Subheading>
                        <Button mode='contained' style={{marginBottom : 10}} onPress={voteProject}> Votar Avance </Button>
                        <HelperText type='error' visible={() => {viewerErrorInfo != ''}}>
                            {viewerErrorInfo}
                        </HelperText>
                    </View> 
                }
                <Subheading style={{marginBottom:15}}>Contacto</Subheading>

                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <IconButton icon='account-arrow-right' onPress={viewUser}/>
                    <Text style={{padding:5}}> {user.firstname + ' ' + user.lastname}</Text>
                </View>
                
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom:20}}>
                    <Avatar.Icon size={24} icon='earth'/>
                    <Text style={{padding:5}}>{project.location.description}</Text>
                    
                </View>

                <Subheading style={{marginBottom:15}}>Tags</Subheading>

                <FlatList
                    data={project.tags}
                    renderItem={item => renderTags(item)}
                    keyExtractor={item => item.key}
                    horizontal = {true}
                />
            </ScrollView>
        </View>
    )
};