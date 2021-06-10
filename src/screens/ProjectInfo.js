import * as React from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Text, Avatar, IconButton, TextInput, Divider, ProgressBar, Subheading } from 'react-native-paper';
import { ImagePickerComponent } from '../components/ImagePickerComponent.js'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: '10%',
      maxWidth: '80%',
    },
    scrollView: {
      marginHorizontal: 0,
    } ,
    title: {
      fontSize: 32,
    },
  })

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

export function ProjectInfo() {
    let dataPrueba = {
        "id": 5,
        "ownerid": "05yseyhiEWPNvkYYbdHL77dHKWi1",
        "title": "10000 Arboles para Chaco",
        "description": "Este proyecto busca fondos para crear una obra de arte en Chaco",
        "type": "Art",
        "stage": "Funding",
        "creationdate": "2021-03-14",
        "finishdate": "2023-03-14",
        "sponsorshipagreement": "Con su aporte de $5000 tendra derecho a que su nombre sea estampado en una placa junto a la obra",
        "seeragreement": "Debera comprometerse a realizar viajes periodicos a Chaco",
        "location": {
          "lat": 120,
          "lng": 40
        },
        "tags": [
          {text:"ArbolesParaChaco"},
          {text:"ChacoVerde"},
          {text:"ChacoVive"}
        ],
        "multimedia": [
          "daoiacpoa12mcahw21hd72ja",
          "jad892of7632nds81ksd98jd",
          "cs83a981ishaja8721odasa1"
        ]
      };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImagePickerComponent/>

            <View 
            style={{flexDirection: "row", justifyContent: "center", marginBottom:20}}
            >
                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Avatar.Icon size={24} icon="tag"/>
                    <Text style={{padding:5}}>{dataPrueba.type}</Text>
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

            <Text style={{marginBottom:10}}>Fase: {dataPrueba.stage}</Text>
            
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
            value={dataPrueba.description}
            />

            <Subheading style={{marginTop:30}}>Tags</Subheading>

            <View>
                <FlatList
                    data={dataPrueba.tags}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.text}
                    horizontal = {true}
                    //extraData={selectedId}
                />
            </View>
        </ScrollView>
    )
};