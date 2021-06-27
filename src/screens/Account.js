import * as React from 'react';
import { ImageBackground, View, ScrollView, StyleSheet} from 'react-native';
import { useTheme, TouchableRipple, Button, Card, Paragraph, Appbar, Switch, Text } from 'react-native-paper';
import {PreferencesContext} from '../components/PreferencesContext.js';
import * as Auth from './../providers/auth-provider.js';
import * as Client from './../providers/client-provider.js';
import { useWindowDimensions } from 'react-native';
import imgSrc from '../../img/paz2.png';

function viewerApply(){
    Auth.getIdToken(true).then((token) => {
          Client.sendViewApply(token).then((response) => {
      }).catch((error) => {
          console.log(error);
      });
  });
}

function Account ({navigation}) {
  const theme = useTheme();
  const {toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [account, setAccount] = React.useState('');

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
        Client.getUserData(token).then((response) => {
          setAccount(response);
        }).catch((error) => {

        });
    }).catch((error) => {

    });
  }, [])
  
  return (
    <View>
      <Appbar.Header style={{height:50}}>
        <Appbar.Content title='Cuenta'/>
      </Appbar.Header>
      <ImageBackground source={imgSrc} style={{width: windowWidth, height: windowHeight, backgroundColor: '#356054'}}>
        <ScrollView contentContainerStyle={styles.container}>

          <Card style = {{marginTop : 40}}>
            <Card.Content style = {{justifyContent : 'center',  alignItems: "center",}}>
              <Card.Title title= {account.firstname + ' ' + account.lastname}/>
            </Card.Content>
          </Card>

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
                <Button mode="contained" onPress={viewerApply} style={{margin: 10}}>
                    Hacerse veedor
                </Button>
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