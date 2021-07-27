import * as React from 'react';
import { Image, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Badge, Title, Card, IconButton, Button, Text, Avatar, TextInput, Divider, 
    ProgressBar, Subheading, Appbar, Portal, Dialog, Paragraph, HelperText } from 'react-native-paper';
import * as Auth from '../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';
import { useIsFocused } from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { ConfirmationBox, AcceptBox } from '../components/ConfirmationBoxes.js';
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent';

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

function makeStateLabel(state){
    switch(state){
        case'on_review':
        return {label: 'Buscando Veedores' , style : {color: 'red'}}

        case 'funding':
        return {label: 'Por financiar', style : {color: '#668C4A'}}

        case 'canceled':
        return {label: 'Cancelado', style : {color: 'red'}};

        case 'in_progress':
        return {label: 'En progreso', style : {color: '#668C4A'}};

        case 'completed':
        return {label: 'Completado', style : {color: '#668C4A'}};

        default:
        return {label: '', style : {}};
    }
}

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
    const isFocused = useIsFocused();
    const theme = useTheme();
    const {projectId} = route.params;
    const [project, setProject] = React.useState({
          id: 0,
          ownerid: '',
          title: '',
          description: '',
          type: '',
          state: '',
          stateLabel: {label: '', style:{}},
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
          tags: [],
          multimedia: [],
          stages: [],
          mine: false
    });

    const [user, setUser] = React.useState({
        firstname: '',
        lastname : ''
    });

    const [isViewer, setIsViewer] =  React.useState(false);
    const [isViewing, setIsViewing] =  React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    const [editDescription, setEditDescription] = React.useState('');
    const [descriptionErrorInfo, setDescriptionErrorInfo] = React.useState('');
    const [transferErrorInfo, setTransferErrorInfo] = React.useState('');
    const [viewerErrorInfo, setViewerErrorInfo] = React.useState('');

    const [visibleDescriptionDialog, setVisibleDescriptionDialog] = React.useState(false);
    const [visibleTransferDialog, setVisibleTransferDialog] = React.useState(false);
    const [visibleTransferResultDialog, setVisibleTransferResultDialog] = React.useState(false);

    const [update, setUpdate] = React.useState(false);
    const [onRequest, setOnRequest] = React.useState(true);
    const [transferAmount, setTransferAmount] = React.useState('');
    const [transferAmountResult, setTransferAmountResult] = React.useState(0);

   

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
                            responseProject.stateLabel = makeStateLabel(responseProject.state);
                            setProject(responseProject);
                            setEditDescription(responseProject.description);
                            setOnRequest(false);
                    }).catch((error) => {
                            console.log(error);
                    });
                }).catch((error) => {
                    console.log(error);
                });

                Client.getUserData(token).then((responseMyData) => {
                    setIsViewer(responseMyData.isviewer);
                }).catch((error) => {
                    console.log(error);
                });

                Client.getFilteredViewProjects(token, projectId).then((responseData) => {
                    setIsViewing(
                        (typeof(responseData.find(element => {return element.id == projectId})) != 'undefined')
                    );
                }).catch((error) => {
                    console.log(error);
                });

                Client.getFilteredFavouriteProjects(token, projectId).then((responseData) => {
                    setIsFavourite(
                        (typeof(responseData.find(element => {return element.id == projectId})) != 'undefined')
                    );
                }).catch((error) => {
                    console.log(error);
                });

                Client.getSubscribedProjects(token, projectId).then((responseData) => {
                    setIsSubscribed(
                        (typeof(responseData.find(element => {return element.id == projectId})) != 'undefined')
                    );
                }).catch((error) => {
                    console.log(error);
                });

            }).catch((error) => {
                console.log(error);
                setOnRequest(false);
            });
        }
    }, [isFocused, update]);

    const favouriteProject = () => {
        Auth.getIdToken(true).then((token) => {
            const func = (isFavourite) ? Client.removeFavouriteProject : Client.sendFavouriteProject;
            func(token, projectId).then((response) => {
            setProject((prevState, props) => {
                const copy = prevState;
                copy.favouritescount += 1;
                return copy;
            });
            setIsFavourite(!isFavourite);
        }).catch((error) => {
            console.log(error);
        });
        });
    };

    const subscribeProject = () => {
        Auth.getIdToken(true).then((token) => {
            const func = (isSubscribed) ? Client.removeSubscribedProject : Client.sendSubscribedProject;
            func(token, projectId).then((response) => {
            setIsSubscribed(!isSubscribed);
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
           setViewerErrorInfo(Client.errorMessageTranslation(error));
        });
        });
    };

    const voteProject = () => {
        Auth.getIdToken(true).then((token) => {
            Client.sendVoteProject(token, projectId, project.actualstage).then((response) => {
            setUpdate(!update);
        }).catch((error) => {
            setViewerErrorInfo(Client.errorMessageTranslation(error));
        });
        });
    };

    const viewUser = () => {
        if(project.hasOwnProperty('ownerid')){
            navigation.navigate('OtherAccount', {userId : project.ownerid});
        }
    };

    const renderStages = ({item}) => {
        const isActualStage = (project.state == 'in_progress' && project.actualstage == parseInt(item.key))
        const color =  isActualStage ? theme.colors.primary : 'grey';
        return (
            <View style={{ alignItems: 'center', marginBottom: 25, marginLeft: 15}}>
                <Badge size={28} style = {{backgroundColor: color , alignSelf: 'center', marginBottom: 15}}> {parseInt(item.key) + 1} </Badge>
                <Card style={isActualStage ? {width: 200, mode: 'outlined', outlineColor: color, outlineStyle: "solid", outlineWidth: 2, elevation: 5} : {width: 200}}>
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
              setUpdate(!update);
        }).catch((error) => {
            setDescriptionErrorInfo(Client.errorMessageTranslation(error));
        });
        }).catch((error) => {
            console.log(error);
        });

        
    };

    const makeTransfer = () => {

        const transferAmountData = {
            amount: parseFloat(transferAmount)
        }

        Auth.getIdToken(true).then((token) => {
            Client.sendTransferData(token, transferAmountData, projectId).then((response) => {
              setVisibleTransferDialog(false);
              setTransferAmountResult(response.amount);
              setTransferErrorInfo('');
              setUpdate(!update);
        }).catch((error) => {
            setTransferErrorInfo(Client.errorMessageTranslation(error));
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
                {!onRequest &&
                    <View style={{flexDirection : 'row'}}>
                        <IconButton size={24} icon= {(isFavourite)  ? 'bell' : 'bell-outline'} color={'white'} onPress={subscribeProject} animated={true}/>
                        <IconButton size={24} icon= {(isSubscribed) ? 'star' : 'star-outline'} color={'white'} onPress={favouriteProject} animated={true}/>
                    </View>
                }
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.container}>
                {onRequest ? 
                <ActivityIndicatorComponent isVisible={onRequest}/>
                :
                <>
                
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

                <Subheading style={{...project.stateLabel.style, alignSelf: 'center'}}> {project.stateLabel.label} </Subheading>
                
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

                {project.state == 'funding' &&
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


                    <Text style={{textAlign: 'center', marginVertical : 10}}> {(transferAmountResult != 0) ? 'Se han transferido ' + transferAmountResult + ' ETH' : ''} </Text>

                    <Button mode='contained' onPress={() => {if (transferAmount != '' && transferAmount != '0') setVisibleTransferDialog(true)}}> ¡Patrocionar! </Button>
                    
                    <HelperText type='error' style={{textAlign: 'center', marginVertical : 10}} visible={() => {transferErrorInfo != ''}}>
                        {transferErrorInfo}
                    </HelperText>
                    
                </View>
                }

                <Portal>
                    <Dialog visible={visibleDescriptionDialog} onDismiss={() => setVisibleDescriptionDialog(false)}>
                      <Dialog.Title>Editar Descripcion</Dialog.Title>
                      <Dialog.Content>
                        <TextInput
                          style={{cont:'flex-start'}}
                          multiline={true}
                          label= 'Nueva descripción'
                          maxLength={240}
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

                <ConfirmationBox   visible={visibleTransferDialog}
                                setVisible={() => setVisibleTransferDialog(false)}
                                     title= 'Confirmar transferencia'
                              description ={'Se transferirán irreversiblemente ' + transferAmount + ' ETH a este proyecto.'}
                                onContinue={makeTransfer}
                                  onCancel={() => setVisibleTransferDialog(false)}
                />

                <Subheading style={{marginBottom:15}}>Fases</Subheading>

                <FlatList
                    data={project.stages}
                    renderItem={item => renderStages(item)}
                    keyExtractor={item => item.key}
                    horizontal = {true}
                />

                {isViewer && !isViewing && project.state == 'on_review' &&
                    <View>
                        <Divider style={{margin:20}}/>
                        <Subheading style={{marginBottom:15}}>Opciones de veedor</Subheading>
                        <Button mode='contained' style={{marginBottom : 10}} onPress={viewProject}> Supervisar </Button>
                        <HelperText type='error' visible={() => {viewerErrorInfo != ''}}>
                            {viewerErrorInfo}
                        </HelperText>
                    </View>
                    
                }

                {isViewer && isViewing && project.state == 'in_progress' &&
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
                </>
                }
            </ScrollView>
        </View>
    )
};
