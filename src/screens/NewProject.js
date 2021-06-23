import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Subheading, Button, Text, IconButton, TextInput, HelperText, Divider, Appbar } from 'react-native-paper';
import { ImagePickerComponent } from '../components/ImagePickerComponent.js'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNPickerSelect from 'react-native-picker-select';
import {CategoryPickerComponent} from '../components/CategoryPickerComponent.js'
import * as Auth from '../providers/auth-provider.js';
import * as Client from  '../providers/client-provider.js';


function uploadImagesUri(images, resolve){
    const images_url = [];
    images.forEach((image) => {
      Auth.uploadImageAsync(image.uri).then((imageUrl) => {
          images_url.push(imageUrl);
      });
    })
    resolve(images_url);
};

function renderItem({item}){
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

export function NewProject() {
    const [title, setTitle] = React.useState('');
    const [images, setImages] = React.useState([]);
    const [location, setLocation] = React.useState('');
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

    const disableButton = () => {
        return title && location && type && description && tags && stages && images;
      };

    const sendNewProject = async () =>{
        const newProject = {};
        newProject.title = title;
        newProject.description = description;
        newProject.location = {
            "description": "Chaco, Argentina",
            "lat": 120,
            "lng": 40
        };
        newProject.type = type;
        newProject.tags = tags.map((element) => {return element.text});
        newProject.multimedia = await new Promise(resolve => uploadImagesUri(images, resolve));
        newProject.stages = [
            {
              "title": "Stage I",
              "description": "Este será el primer stage.",
              "amount": 1000
            },
            {
              "title": "Stage II",
              "description": "Este será el segundo stage.",
              "amount": 2000
            }
          ];

        Auth.getIdToken(true).then((token) => {
        Client.sendNewProject(token, newProject).then(() =>{
             navigation.navigate('Mis proyectos');
           }).catch((error) => {
           if (error / 100 == 5){
              setErrorInfo('Error interno del servidor. Intente más tarde.')
           }else{
              setErrorInfo('No se ha podido crear su proyecto. Revise su solicitud.')
           }
        });
        });
    }
    function addTag (){
        if (newTag) {
            for (const d in tags) {
                if (newTag == tags[d].text) {
                    alert("Etiqueta usada.") // ACA SE PODRÍA AVISAR AL USUARIO QUE ESTÁ REPETIDO EL TAG
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
            copy.push({id: `${stageId}`, text: newStage, amount: stageAmount, description: stageDesc});
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

    return (
        <View style={{flex:1}}>
            <Appbar.Header style={{height:50}}>
                <Appbar.Content title='Nuevo Proyecto'/>
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='always' listViewDisplayed={false}>
                <TextInput // LIMITAR CANTIDAD CARACTERES
                    label={'Título'}
                    mode='outlined'
                    dense={true}
                    style={{marginVertical:15}}
                    value={title}
                    onChangeText={title => setTitle(title)}
                    left={<TextInput.Icon name='format-title'/>}
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

                <View style={{
                        fontSize: 16,
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 4,
                        color: 'black',
                        paddingRight: 30,
                        justifyContent:'center',
                        marginVertical: 15,
                      }}>
                    <TextInput.Icon name='tag' style={{marginLeft:30}}/>
                    <View style={{marginHorizontal: 30}}>
                        <CategoryPickerComponent type={type} setType = {setType}/>
                    </View>
                </View>
                
                <Divider style={{margin:20}}/>
                
                <Subheading>Descripción</Subheading>

                <TextInput // LIMITAR CANTIDAD CARACTERES
                    multiline={true}
                    label={'Descripción'}
                    mode='outlined'
                    dense={true}
                    style={{height:100, justifyContent:"flex-start", padding: 0, textAlignVertical:'top'}} // ARREGLAR EL CONTENIDO, TAMAÑO, JUSTIFICACION, ETC
                    value={description}
                    maxLength={140}
                    onChangeText={description => setDescription(description)}
                />

                <View style={{}}>
                   <Subheading style={{marginTop:30}}>Etiquetas</Subheading>

                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <TextInput // LIMITAR CANTIDAD CARACTERES
                            label={'Etiqueta'}
                            mode='outlined'
                            dense={true}
                            style={{flex:1}}
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
                        renderItem={item => renderItem(item)}
                        keyExtractor={item => item.id}
                        horizontal = {true}
                    />
                </View>

                <View style={{}}>
                   <Subheading style={{marginTop:30}}>Etapas</Subheading>

                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <TextInput // LIMITAR CANTIDAD CARACTERES
                                label={'Título Etapa'}
                                mode='outlined'
                                dense={true}
                                style={{flex:1}}
                                value={newStage}
                                onChangeText={newStage => setNewStage(newStage)}
                                left={<TextInput.Icon name='file-document-edit-outline'/>}
                            />

                            <TextInput // PONER SOLO NUMERO Y LIMITAR CANTIDAD
                                label={'Importe Etapa'}
                                mode='outlined'
                                dense={true}
                                style={{flex:1}}
                                value={stageAmount}
                                onChangeText={stageAmount => setStageAmount(stageAmount)}
                                left={<TextInput.Icon name='cash'/>}
                            />

                            <TextInput // LIMITAR CANTIDAD CARACTERES
                                multiline={true}
                                label={'Descripción Etapa'}
                                mode='outlined'
                                dense={true}
                                style={{height:100, flex:1, justifyContent:"flex-start", padding: 0, textAlignVertical:'top'}} // ARREGLAR EL CONTENIDO, TAMAÑO, JUSTIFICACION, ETC
                                value={stageDesc}
                                maxLength={140}
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
                        // LO QUE SE PUEDE HACER ACA ES CAMBIAR ESTE RENDERITEM(ITEM)
                        // Y HACER QUE SE RENDERICE UN BOTON QUE CUANDO SE APRETE MUESTRE TITULO, DESCRIPCION Y MONTO
                        // AHORA SOLO SE MUESTRA EL TITULO, PERO SE GUARDA TODO
                        data={stages}
                        renderItem={item => renderItem(item)}
                        keyExtractor={item => item.text}
                        horizontal = {true}
                    />
                </View>

                <Button
                    mode="contained"
                    onPress={sendNewProject}
                    style={{marginHorizontal: '25%', marginVertical:'10%'}}
                    disabled={disableButton()}
                >
                    FINALIZAR
                </Button>
                <HelperText type="error" visible={() => errorInfo != ''}>
                {errorInfo}
                </HelperText>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      marginHorizontal: '10%',
    }
  })