import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Text, Subheading, Button, Paragraph, IconButton, TextInput, 
    HelperText, Divider, Appbar, Card, Badge, useTheme, Title} from 'react-native-paper';
import { ImagePickerComponent } from '../components/ImagePickerComponent.js'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {CategoryPickerComponent} from '../components/CategoryPickerComponent.js'
import * as Auth from '../providers/auth-provider.js';
import * as Client from  '../providers/client-provider.js';
import { TextInputMask } from 'react-native-masked-text';
import PortalActivityIndicator from "../components/PortalActivityIndicator"

const styles = StyleSheet.create({
    container: {
      marginHorizontal: '10%',
    }
  })

async function uploadImagesUri(images){
    const upload_promises = [];
    images.forEach((image) => {
      upload_promises.push(Auth.uploadImageAsync(image.uri));
    })
    const images_url = await Promise.all(upload_promises);
    return images_url;
};

function renderTags({item}) {
    return (
        <View>
            <TextInput
                disabled={true}
                mode='outlined'
                dense={true}
                style={{margin:15}}
                value={item.text}
            />
        </View>
    );
};

export function NewProject({navigation}) {
    const [title, setTitle] = React.useState('');
    const [images, setImages] = React.useState([]);
    const [location, setLocation] = React.useState('');
    const [latitud, setLatitud] = React.useState(Infinity);
    const [longitud, setLongitud] = React.useState(Infinity);
    const [type, setType] = React.useState(''); 
    const [description, setDescription] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [newTag, setNewTag] = React.useState('');
    const [stages, setStages] = React.useState([]);
    const [newStage, setNewStage] = React.useState('');
    const [stageId, setStageId] = React.useState(1);
    const [stageAmount, setStageAmount] = React.useState('');
    const [stageDesc, setStageDesc] = React.useState('');
    const [errorInfo, setErrorInfo] = React.useState('');
    const [visibleActivity, setVisibleActivity] = React.useState(false);
    const theme = useTheme();

    const disableButton = () => {
        return !(title && location && latitud < Infinity && longitud < Infinity && type && description && tags && stages && images) || visibleActivity;
    };

    const sendNewProject = async () => {
        setVisibleActivity(true);
        const newProject = {};
        newProject.title = title;
        newProject.description = description;
        newProject.location = {
            "description": location,
            "lat": latitud,
            "lng": longitud
        };
        newProject.type = type;
        newProject.tags = tags.map((element) => {return element.text});
        newProject.multimedia = await uploadImagesUri(images);
        newProject.stages = stages.map((element) => {return {title: element.title, description : element.description, amount : parseFloat(element.amount)}});
        Auth.getIdToken(true).then((token) => {
        Client.sendNewProject(token, newProject).then((responseProject) =>{
            Client.sendSubscribedProjects(token, responseProject.id).catch((error) => {});
            setVisibleActivity(false);
            navigation.navigate('MyProjects');
           }).catch((error) => {
           setErrorInfo(Client.errorMessageTranslation(error));
           setVisibleActivity(false);
        });
        });
    }
    
    function addTag (){
        if (newTag.length > 0) {
            if (newTag.includes(' ')) {
                alert("La etiqueta no puede contener espacios.");
                return;
            }

        setTags((prevState, props) => {
                for (const d in prevState) {
                    if (newTag == prevState[d].text) {
                        return prevState;
                    }
                }
                return [... prevState, {text: newTag}]
            });
            setNewTag('');
        }
    };

    function removeTag (){
        setTags((prevState, props) => {
            const butLast = prevState;
            const last = butLast.pop();
            if(last) setNewTag(last.text);
            return butLast;
        });
    };

    function addStage (){
        if (newStage && stageAmount && stageDesc) {
            setStages((prevState, props) => {
                return [... prevState, {id: `${stageId}`, title: newStage,
                 amount: stageAmount, description: stageDesc}]
            });
            setNewStage('');
            setStageAmount('');
            setStageDesc('');
            setStageId((prevState, props) => {return prevState + 1});
        } else alert("Completar todos los campos."); 
    };

    function removeStage (){
        setStages((prevState, props) => {
            if(prevState.length == 0) return [];
            const butLast = prevState;
            const last = butLast.pop();
            setNewStage(last.title);
            setStageAmount(last.amount);
            setStageDesc(last.description);
            setStageId((prevState2, props) => {return prevState2 - 1});
            return butLast;
        });
    };

    const renderStages = ({item}) => {
        return (
            <View style={{ alignItems: 'center', marginVertical: 25, marginLeft: 10}}>
                <Badge size={28} style = {{backgroundColor: theme.colors.primary, alignSelf: 'center', marginBottom: 10}}> {parseInt(item.id)} </Badge>
                <Card style={{width: 200}}>
                    <Card.Content>
                        <Title> {item.title} </Title>
                        <Divider style={{marginVertical : 8}}/>
                        <Subheading> {item.amount + ' ETH'} </Subheading>
                        <Divider style={{marginVertical : 8}}/>
                        <Paragraph> {item.description} </Paragraph>
                    </Card.Content>
                </Card>
            </View>
        );
    }

    return (
        <View style={{flex:1}}>
            <PortalActivityIndicator isVisible={visibleActivity}/>

            <Appbar.Header style={{height:50}}>
                <Appbar.BackAction onPress={() => navigation.navigate("ProjectRoute")} />
                <Appbar.Content title='Nuevo Proyecto'/>
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='always' listViewDisplayed={false}>
                <TextInput
                    label={'Título'}
                    mode='outlined'
                    dense={true}
                    style={{marginVertical:15}}
                    value={title}
                    onChangeText={title => setTitle(title)}
                    left={<TextInput.Icon name='format-title'/>}
                    maxLength={40}
                />

                <HelperText type="error" style={{justifyContent : 'center'}} visible={(title.length < 1)}>
                    El título debe contener al menos 1 caracter.
                </HelperText>

                <Divider style={{margin:20}}/>

                <Subheading> Imagenes </Subheading>

                <SafeAreaView>
                    <ImagePickerComponent output={setImages}/>
                </SafeAreaView>

                <Text>Tras agregar imágenes puede mantener presionado para reordenarlas. La primera se tomará como portada.</Text>
                <Divider style={{margin:20}}/>

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

                <CategoryPickerComponent setType={setType} value={type}/>
                
                <Divider style={{margin:20}}/>
                
                <Subheading>Descripción</Subheading>
                
                <TextInput
                    multiline={true}
                    label={'Descripción'}
                    mode='outlined'
                    dense={true}
                    style={{ justifyContent:"flex-start", textAlignVertical:'top'}} 
                    value={description}
                    maxLength={240}
                    onChangeText={description => setDescription(description)}
                />

                <HelperText type="error" style={{justifyContent : 'center'}} visible={(description.length < 1)}>
                    La descripción debe contener al menos 1 caracter.
                </HelperText>

                <View style={{}}>
                   <Subheading style={{marginTop:30}}>Etiquetas</Subheading>
                    <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <TextInput
                            label={'Etiqueta'}
                            mode='outlined'
                            dense={true}
                            style={{flex:4}}
                            maxLength={25}
                            value={newTag}
                            onChangeText={newTag => setNewTag(newTag)}
                            left={<TextInput.Icon name='pound'/>}
                        />
                        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                            <IconButton 
                                size={32}
                                icon="plus-box" 
                                onPress={addTag}
                            />
                            <IconButton 
                                size={32}
                                icon="minus-box" 
                                onPress={removeTag}
                            />
                        </View>
                    </View>
                
                    <FlatList
                        data={tags}
                        renderItem={item => renderTags(item)}
                        keyExtractor={item => item.text}
                        horizontal = {true}
                    />
                </View>

                <View style={{}}>
                   <Subheading style={{marginTop:30}}>Etapas</Subheading>

                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <TextInput
                                label={'Título Etapa'}
                                mode='outlined'
                                dense={true}
                                style={{flex:1}}
                                maxLength={30}
                                value={newStage}
                                onChangeText={newStage => setNewStage(newStage)}
                                left={<TextInput.Icon name='file-document-edit-outline'/>}
                            />

                            <TextInput
                                // CHEQUEAR MINIMO 1
                                label='Importe Etapa'
                                value={stageAmount}
                                placeholder='Max: 9.9999 ETH'
                                onChangeText={stageAmount => setStageAmount(stageAmount)}
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

                            <TextInput
                                multiline={true}
                                label={'Descripción Etapa'}
                                mode='outlined'
                                dense={true}
                                style={{flex:1}} 
                                value={stageDesc}
                                maxLength={240}
                                onChangeText={stageDesc => setStageDesc(stageDesc)}
                            />
                        </View>

                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:1, backgroundColor:'#000000', height:'30%'}}></View>
                            <IconButton 
                                size={32}
                                icon="plus-box"
                                onPress={addStage}
                            />
                            <IconButton 
                                size={32}
                                icon="minus-box"
                                onPress={removeStage}
                            />
                            <View style={{width:1, backgroundColor:'#000000', height:'30%'}}></View>
                        </View>
                    </View>

                    <HelperText type="error" style={{justifyContent : 'center'}}visible={stages.length < 1}>
                            Debe añadirse al menos una etapa.
                    </HelperText>

                    <FlatList
                        data={stages}
                        renderItem={item => renderStages(item)}
                        keyExtractor={item => item.id}
                        horizontal = {true}
                    />
                </View>

                <HelperText type="error" style={{justifyContent : 'center'}}visible={() => errorInfo != ''}>
                    {errorInfo}
                </HelperText>
                <Button
                    mode="contained"
                    onPress={sendNewProject}
                    style={{marginHorizontal: '25%', marginVertical:'10%'}}
                    disabled={disableButton()}
                >
                    FINALIZAR
                </Button>

            </ScrollView>
        </View>
    )
};
