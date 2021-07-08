import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ActivityIndicator, Subheading, Button, Portal, Paragraph, 
    IconButton, TextInput, HelperText, Divider, Appbar, Card, Badge, useTheme, Title} from 'react-native-paper';
import { ImagePickerComponent } from '../components/ImagePickerComponent.js'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {CategoryPickerComponent} from '../components/CategoryPickerComponent.js'
import * as Auth from '../providers/auth-provider.js';
import * as Client from  '../providers/client-provider.js';
import { TextInputMask } from 'react-native-masked-text';

async function uploadImagesUri(images){
    const upload_promises = [];
    images.forEach((image) => {
      upload_promises.push(Auth.uploadImageAsync(image.uri));
    })
    const images_url = await Promise.all(upload_promises);
    console.log(images_url);
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

    // AGREGAR HELPERTEXT CON MINIMOS PARA CADA INPUT
    // 5 PARA TODOS (preguntar a julian esto, si hace falta, mas que nada por los tags)
    // AGREGAR BOTONES DE MENOS ABAJO DE LOS DE MAS PARA BORRAR ETIQ Y ETAPAS
    // PANTALLA DE CARGA AL SUBIR
    
    // Descripción no hace salto de linea
    // Probar favorito en appbar

    
    const disableButton = () => {
        return !(title && location && type && description && tags && stages && images) || visibleActivity;
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
        newProject.stages = stages.map((element) => {return {title: element.title, description : element.description, amount : element.amount}});
        Auth.getIdToken(true).then((token) => {
        Client.sendNewProject(token, newProject).then(() =>{
            setVisibleActivity(false);
            navigation.navigate('MyProjects');
           }).catch((error) => {
           if (error / 100 == 5){
              setErrorInfo('Error interno del servidor. Intente más tarde.')
           }else{
              setErrorInfo('No se ha podido crear su proyecto. Revise su solicitud.')
           }
           setVisibleActivity(false);
        });
        });
    }
    function addTag (){
        if (newTag) {
            if (newTag.includes(' ')) {
                alert("La etiqueta no puede contener espacios.");
                return;
            }
            for (const d in tags) {
                if (newTag == tags[d].text) {
                    alert("Etiqueta usada."); // Cambiar
                    return;
                }
            }
            const copy = [...tags];
            copy.push({text: newTag});
            setTags(copy);
            setNewTag('');
        } else alert("Completar el campo."); // Cambiar
    };

    function addStage (){
        if (newStage && stageAmount && stageDesc) {
            const copy = [...stages];
            copy.push({id: `${stageId}`, title: newStage, amount: stageAmount, description: stageDesc});
            setStages(copy);
            setNewStage('');
            setStageAmount('');
            setStageDesc('');
            setStageId(stageId+1);
        } else alert("Completar todos los campos."); // Cambiar
    };

    function endProject() {
        uploadImagesUri(images).then((imagesUri) => {
            sendProject(imagesUri); // crear y enviar
        }).catch((error) => {
            alert(error);
        });
    }

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
            {
                visibleActivity && 
                <Portal>
                    <View style={{flex:1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0, 0, 72, 0.1)'}}>
                        <ActivityIndicator
                            animating={visibleActivity}
                            size="large"
                            style={styles.activityIndicator}
                        />
                    </View>
                </Portal>
            }

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

                <Divider style={{margin:20}}/>

                <Subheading> Imagenes </Subheading>

                <SafeAreaView>
                    <ImagePickerComponent output={setImages}/>
                </SafeAreaView>

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

                {/* VER TEMA DE QUE NO SE PUEDE OCULTAR TECLADO
                VER SI SE PUEDE HACER MULTILINEA SIN MULTILINE:TRUE
                O VER SI HAY FORMA DE HACER CERRAR EL TECLADO */}
                
                <TextInput
                    multiline={true}
                    label={'Descripción'}
                    mode='outlined'
                    dense={true}
                    style={{height:100, justifyContent:"flex-start", padding: 0, textAlignVertical:'top'}} // ARREGLAR EL CONTENIDO, TAMAÑO, JUSTIFICACION, ETC
                    value={description}
                    maxLength={240}
                    onChangeText={description => setDescription(description)}
                />

                <View style={{}}>
                   <Subheading style={{marginTop:30}}>Etiquetas</Subheading>
                    {/* PROHIBIR QUE TENGAN ESPACIOS Y MSG ERROR */}
                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <TextInput
                            label={'Etiqueta'}
                            mode='outlined'
                            dense={true}
                            style={{flex:1}}
                            maxLength={25}
                            value={newTag}
                            onChangeText={newTag => setNewTag(newTag)}
                            left={<TextInput.Icon name='pound'/>}
                        />

                        <IconButton 
                            size={32}
                            icon="plus-box" 
                            onPress={() => addTag()}
                        />
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
                                placeholder='Max: 99999 ETH'
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
                                        mask: '99999'
                                    }}
                                />
                                }
                            />

                            {/* VER TEMA DE QUE NO SE PUEDE OCULTAR TECLADO
                            VER SI SE PUEDE HACER MULTILINEA SIN MULTILINE:TRUE
                            O VER SI HAY FORMA DE HACER CERRAR EL TECLADO */}
                            <TextInput
                                multiline={true}
                                label={'Descripción Etapa'}
                                mode='outlined'
                                dense={true}
                                style={{height:100, flex:1, justifyContent:"flex-start", padding: 0, textAlignVertical:'top'}} // ARREGLAR EL CONTENIDO, TAMAÑO, JUSTIFICACION, ETC
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
                                onPress={() => addStage()}
                            />
                            <View style={{width:1, backgroundColor:'#000000', height:'30%'}}></View>
                        </View>
                    </View>

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

const styles = StyleSheet.create({
    container: {
      marginHorizontal: '10%',
    }
  })