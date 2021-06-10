import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Subheading, Button, Text, IconButton, TextInput, HelperText, Divider, Appbar } from 'react-native-paper';
import { ImagePickerComponent } from '../components/ImagePickerComponent.js'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNPickerSelect from 'react-native-picker-select';

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
    const [location, setLocation] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [type, setType] = React.useState(''); 
    const [description, setDescription] = React.useState('');
    const [newTag, setNewTag] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [stages, setStages] = React.useState([]);
    const [newStage, setNewStage] = React.useState('');
    const [stageId, setStageId] = React.useState(1);
    const [images, setImages] = React.useState([]);

    const data = [
        { label: "DataCat", value: 1 },
        { label: "DataDog", value: 2 },
        { label: "DataSnake", value: 3 },
        { label: "DataPlatypus", value: 4 },
        { label: "DataWhale", value: 5 }
      ];

    function addTag (){
        if (newTag) {
            for (const d in tags) {
                if (newTag == tags[d].text) {
                    // ACA SE PODRÍA AVISAR AL USUARIO QUE ESTÁ REPETIDO EL TAG
                    return;
                }
            }
            const copy = [...tags];
            copy.push({text: newTag});
            setTags(copy);
            setNewTag('');
        }
    };

    function addStage (){
        if (newStage) {
            const copy = [...stages];
            copy.push({id: `${stageId}`, text: newStage});
            setStages(copy);
            setNewStage('');
            setStageId(stageId+1);
        }
    };

    return (
        <View style={{flex:1}}>
            <Appbar.Header style={{height:50, paddingBottom:10}}>
                <Appbar.Content title='Nuevo Proyecto'/>
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
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

                <SafeAreaView>
                <GooglePlacesAutocomplete
                    onPress={(data, details = null) => {
                        setLocation(data.description);
                    }}
                    query={{
                        key: 'AIzaSyDlPVGnR9jYlGObED64_d5HMO88YN0yz5A',
                        language: 'en',
                    }}
                    textInputProps={{
                        InputComp: TextInput,
                        label:'Ubicacion',
                        mode:'outlined',
                        dense:true,
                        style:{marginVertical:15, flex:1},
                        value: location,
                        onChangeText: location => setLocation(location),
                        left:<TextInput.Icon name='earth'/>,
                      }}
                />
                </SafeAreaView>

                <TextInput
                label={'Importe'}
                mode='outlined'
                dense={true}
                style={{marginVertical:15}}
                value={amount}
                onChangeText={amount => setAmount(amount)}
                left={<TextInput.Icon name='cash'/>}
                on
                />

                <View style={{
                        fontSize: 16,
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 4,
                        color: 'black',
                        paddingRight: 30, // to ensure the text is never behind the icon
                        justifyContent:'center',
                        marginVertical: 15,
                      }}>
                    <TextInput.Icon name='tag' style={{marginLeft:30}}/>
                    <RNPickerSelect
                        onValueChange={type => setType(type)}
                        placeholder={{
                            label: 'Categoría',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />
                </View>
                
                <Divider style={{margin:20}}/>
                
                <Subheading>Descripcion</Subheading>

                <TextInput
                multiline={true}
                label={'Descripcion'}
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
                        <TextInput
                            label={'Nuevo Tag'}
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
                   <Subheading style={{marginTop:30}}>Fases</Subheading>

                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <TextInput
                            label={'Nueva Fase'}
                            mode='outlined'
                            dense={true}
                            style={{flex:1}}
                            value={newStage}
                            onChangeText={newStage => setNewStage(newStage)}
                            left={<TextInput.Icon name='file-document-edit-outline'/>}
                        />

                        <IconButton 
                            size={32}
                            icon="plus-box"
                            onPress={() => addStage()}
                        />
                    </View>
                    
                    <FlatList
                        data={stages}
                        renderItem={item => renderItem(item)}
                        keyExtractor={item => item.text}
                        horizontal = {true}
                    />
                </View>

                <Button
                    mode="contained"
                    onPress={() => alert("Soy un boton")}
                    style={{marginHorizontal: '25%', marginVertical:'10%'}}
                >
                    FINALIZAR
                </Button>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //justifyContent: 'center',
      marginHorizontal: '10%',
      //maxWidth: '80%',
      //paddingTop:'10%'
    }
  })