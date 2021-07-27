import * as React from 'react';
import {useWindowDimensions, ImageBackground, View, ScrollView, StyleSheet} from 'react-native';
import { Dialog, ActivityIndicator, Portal, useTheme, TouchableRipple, Button, IconButton, 
  Card, Paragraph, Appbar, Switch, Text, TextInput, HelperText } from 'react-native-paper';
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
  const [signOut, setSignOut] = React.useState(false);
  const {toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const [account, setAccount] = React.useState('');
  const [wallet, setWallet] = React.useState('');
  const [update, setUpdate] = React.useState(false);
  const [visibleEdit, setVisibleEdit] = React.useState(false);
  const [editFirstName, setEditFirstName] = React.useState('')
  const [editLastName, setEditLastName] = React.useState('');
  const [visibleActivity, setVisibleActivity] = React.useState(false);
  const [nameErrorInfo, setNameErrorInfo] = React.useState('');
  const isFocused = useIsFocused();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {

    if(signOut){
      Auth.signOut();
      return;
    } 

    Auth.getIdToken(true).then((token) => {
        Client.getUserData(token).then((response) => {
          setAccount(response);
          setEditFirstName(response.firstname);
          setEditLastName(response.lastname);
        }).catch((error) => {

        });
        Client.getWalletData(token).then((response) => {
          setWallet(response);
        }).catch((error) => {

        });
    }).catch((error) => {

    });
    setVisibleActivity(false);
  }, [update, isFocused, signOut]);

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

    setUpdate(!update);
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
    
    Auth.getIdToken(true).then((token) => {
            Client.patchUserData(token, newPersonalData).then((response) => {
              hideDialog();
              setNameErrorInfo('');
        }).catch((error) => {
            setNameErrorInfo(Client.errorMessageTranslation(error));
        });
    }).catch((error) => {
            console.log(error);
    });

    setUpdate(!update);
  }

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  

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
            <Card.Actions style = {{justifyContent : 'center',  alignItems: "center", marginHorizontal:15}}>
              <Card.Title title= {account.firstname + ' ' + account.lastname}/>
              <IconButton icon='pencil' mode='contained' onPress={showDialog}/>
            </Card.Actions>
          </Card>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Editar Nombre</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label= 'Nombre'
                  value={editFirstName}
                  onChangeText={(text) => setEditFirstName(text)}
                  maxLength={50}
                />
                <TextInput
                  label='Apellido'
                  value={editLastName}
                  onChangeText={(text) => setEditLastName(text)}
                  maxLength={50}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancelar</Button>
                <Button onPress={updatePersonalData}>Hecho</Button>
              </Dialog.Actions>
              <HelperText type="error" visible={() => {nameErrorInfo != ''}}>
                {nameErrorInfo}
              </HelperText>
            </Dialog>
          </Portal>

          <Card style = {{marginTop : 20}}>
            <Card.Content>
              <Card.Title title= "Datos personales"/>
              <Paragraph>Correo : {account.email} </Paragraph>
              <Paragraph>Fecha de nacimiento : {account.birthdate}  </Paragraph>
              <Paragraph>Fecha de registro   : {account.signindate} </Paragraph>
            </Card.Content>
          </Card>

          <Card style = {{marginTop : 20}}>
            <Card.Content>
              <Card.Title title= "Billetera"/>
              <Paragraph>PublicKey: {wallet.address} </Paragraph>
              <Paragraph>Balance : {wallet.balance + ' ETH'} </Paragraph>
              <Paragraph>Fecha de creación   : {wallet.creationdate} </Paragraph>
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
                  <Button mode="contained" onPress={() => {navigation.navigate('NewSeerProjects')}} style={{margin: 10}}>
                    Proyectos disponibles
                  </Button> 
                  <Paragraph> ¡Felicidades! Ya eres veedor. </Paragraph>
                </View>
              }
            </Card.Content>
          </Card>

          <Card style = {{marginTop : 20, marginBottom : 100}}>
            <Card.Content>
              
                <Button mode="contained"
                  style={{marginBottom: 30}}
                  onPress={() => setSignOut(true)}>
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