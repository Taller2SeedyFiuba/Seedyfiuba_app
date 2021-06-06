import * as React from 'react';
import { View } from 'react-native';
import { Text, Avatar, IconButton, TextInput, Divider, ProgressBar } from 'react-native-paper';

export function NewProject() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View 
            style={{flexDirection: "row", justifyContent: "center", marginBottom:20}}
            >
                <View style={{flex:1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Avatar.Icon size={24} icon="tag"/>
                    <Text style={{padding:5}}>Categoria</Text>
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
            <Text style={{marginBottom:10}}>Fase</Text>
            <ProgressBar progress={0.5} style={{marginBottom:10}}/>
            <Text style={{marginBottom:20}}>Importe</Text>
            <Divider/>
            <View 
            style={{flexDirection: "row", alignItems: "center"}}
            >
              <Text>Descripcion</Text>
              <IconButton size={24} icon="pencil" onPress={() => alert("Pressed")}/>
            </View>
            <TextInput
            style={{height:100, cont:"flex-start"}} // ARREGLAR EL CONTENIDO, TAMAÑO, JUSTIFICACION, ETC
            multiline={true}
            />
        </ScrollView>
    )
};