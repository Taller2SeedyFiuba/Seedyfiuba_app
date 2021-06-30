import * as React from 'react';
import {useWindowDimensions, ImageBackground, View, ScrollView, StyleSheet} from 'react-native';
import { HelperText, ActivityIndicator, TextInput, useTheme, TouchableRipple, Button, IconButton, Card, Paragraph, Appbar, Switch, Text } from 'react-native-paper';
import {PreferencesContext} from '../components/PreferencesContext.js';
import * as Auth from './../providers/auth-provider.js';
import * as Client from './../providers/client-provider.js';
import {stringContainsOnlyLetters} from './../functions/SignErrors.js';
import { useIsFocused } from '@react-navigation/native';
import imgSrc from '../../img/paz2.png';

function Account ({navigation}) {
  const theme = useTheme();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const {toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const [account, setAccount] = React.useState('');
  const [update, setUpdate] = React.useState(false);
  const [visibleEdit, setVisibleEdit] = React.useState(false);
  const [editFirstName, setEditFirstName] = React.useState('')
  const [editLastName, setEditLastName] = React.useState('');
  const [visibleActivity, setVisibleActivity] = React.useState(false);
  const [nameErrorInfo, setNameErrorInfo] = React.useState('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
        Client.getUserData(token).then((response) => {
          setAccount(response);
          setEditFirstName(response.firstname);
          setEditLastName(response.lastname);
        }).catch((error) => {

        });
    }).catch((error) => {

    });
    setUpdate(false);
    setVisibleActivity(false);
  }, [update, isFocused]);

  const viewerApply = () => {
    setVisibleActivity(true);
    Auth.getIdToken(true).then((token) => {
            Client.sendViewApply(token).then((response) => {
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
            console.log(error);
    });
    setUpdate(true);
  }

  const updatePersonalData = () => {
    if(editFirstName.length < 5 || editLastName.length < 5){
      setNameErrorInfo('Su nombre y apellido deben contener al menos 5 caracters');
      return;
    }else{
      if(!stringContainsOnlyLetters(editFirstName) || !stringContainsOnlyLetters(editLastName)){
        setNameErrorInfo('Solo se admiten letras para su nombre y apellido');
        return;
      }
    }
    
    const newPersonalData = {
      firstname : editFirstName,
      lastname : editLastName
    }
    setVisibleActivity(true);
    Auth.getIdToken(true).then((token) => {
            Client.patchUserData(token, newPersonalData).then((response) => {
        }).catch((error) => {
          if(Math.floor(error / 4) == 100){
            setNameErrorInfo('Datos inválidos. Revise su solicitud.')
          }else{
            setNameErrorInfo('Error interno del servidor. Inténtelo más tarde.')
          }
        });
    }).catch((error) => {
            console.log(error);
    });
    setUpdate(true);
  }
  

  return (

    <View>
      <Appbar.Header style={{height:50}}>
        <Appbar.Content title='Cuenta'/>
      </Appbar.Header>
      {visibleActivity && <ActivityIndicator
       animating = {visibleActivity}
       size = "large"
       style = {styles.activityIndicator}/>}
      <ImageBackground source={imgSrc} style={{width: windowWidth, height: windowHeight, backgroundColor: '#356054'}}>
        <ScrollView contentContainerStyle={styles.container}>

          <Card style = {{marginTop : 40}}>
            <Card.Actions style = {{justifyContent : 'center',  alignItems: "center",}}>
              <Card.Title title= {account.firstname + ' ' + account.lastname}/>
              <IconButton icon='pencil' mode='contained' onPress={()=>{setVisibleEdit(!visibleEdit)}}/>
            </Card.Actions>
          </Card>

          {visibleEdit &&
          <View>
          <Card style = {{marginTop : 40}}>
            <Card.Content style = {{justifyContent : 'center',  alignItems: "center",}}>
            <TextInput
              label= 'Nombre'
              value={editFirstName}
              onChangeText={(text) => setEditFirstName(text)}
            />
            <TextInput
              label='Apellido'
              value={editLastName}
              onChangeText={(text) => setEditLastName(text)}
            />
            <Button mode="contained" onPress={updatePersonalData} style={{margin: 10}}>
                    Cambiar Nombre
            </Button>
            <HelperText type="error" visible={() => {nameErrorInfo != ''}}>
              {nameErrorInfo}
            </HelperText>
            </Card.Content>
          </Card>
          </View>
          }

          <Card style = {{marginTop : 20}}>
            <Card.Content>
              <Card.Title title= "Datos personales"/>
              <Paragraph>Id: {account.id} </Paragraph>
              <Paragraph>Correo : {account.email} </Paragraph>
              <Paragraph>Fecha de nacimiento : {account.birthdate}  </Paragraph>
              <Paragraph>Fecha de registro   : {account.signindate} </Paragraph>
            </Card.Content>
          </Card>


          <Card style = {{marginTop : 20}}>
            <Card.Content>
              <Card.Title title= "Billetera"/>
              <Paragraph>PuclicKey: {account.id} </Paragraph>
              <Paragraph>Balance : {'0.0025' + ' ETH'} </Paragraph>
              <Paragraph>Fecha de creación   : {account.signindate} </Paragraph>
            </Card.Content>
          </Card>

          <Card style = {{marginTop : 20}}>
            <Card.Content>
              <Card.Title title= "Veeduría"/>
              {
                !account.isviewer && <View>
                  <Button mode="contained" onPress={viewerApply} style={{margin: 10}}>
                    Hacerse veedor
                  </Button> 
                  <Paragraph> (La aprobación de la solicitud puede demorarse algunos días) </Paragraph>
                </View>

     
              }

              {
                account.isviewer && <View>
                  <Button mode="contained" onPress={() => {navigation.navigate('Veedor')}} style={{margin: 10}}>
                    Ver proyectos disponibles
                  </Button> 
                  <Paragraph> ¡Felicidades! Ya eres veedor. </Paragraph>
                </View>
              }
            </Card.Content>
          </Card>

          <Card style = {{marginTop : 20, marginBottom : 100}}>
            <Card.Content>
              <Card.Title title= "Ajustes"/>
                <Card.Actions>
                  <Text> Tema:  </Text>
                  <TouchableRipple onPress={toggleTheme}>
                    <Switch value={isThemeDark}/>
                  </TouchableRipple>
                </Card.Actions>
                <Button mode="contained"
                  style={{margin: 10}}
                  onPress={() => Auth.signOut()}>
                  Cerrar sesion
                </Button>
            </Card.Content>
          </Card>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
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

export {Account}