import * as React from 'react';
import {useWindowDimensions, ImageBackground, View, ScrollView, StyleSheet} from 'react-native';
import { Button, Card, Paragraph, Appbar } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
import * as Client from './../providers/client-provider.js';
import { useIsFocused } from '@react-navigation/native';
import imgSrc from '../../img/paz2.png';
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent';

export function OtherAccount ({route, navigation}) {
  const {userId} = route.params;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [myAccount, setMyAccount] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [onRequest, setOnRequest] = React.useState(true);
  const isFocused = useIsFocused();

  const addContact = () => {
    if (userId != myAccount.id){
       Auth.sendContact(Auth.getUid(),myAccount.firstname, userId, account.firstname);
       navigation.navigate('Message');
    }
  }

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {

       Client.getUserData(token).then((response) => {
          setMyAccount(response);
          setOnRequest(false);
        }).catch((error) => {
          setOnRequest(false);
        });

        Client.getOtherUserData(token, userId).then((response) => {
          setAccount(response);
        }).catch((error) => {
          setOnRequest(false);
        });

    }).catch((error) => {
      setOnRequest(false);
    });
  }, [isFocused]);

  return (
    <View>
      <Appbar.Header style={{height:50}}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={"Cuenta"}/>
      </Appbar.Header>

      <ImageBackground source={imgSrc} style={{width: windowWidth, height: windowHeight, backgroundColor: '#356054'}}>
        <ScrollView contentContainerStyle={styles.container}>

          {onRequest ? 
          <ActivityIndicatorComponent isVisible={onRequest}/>
          :
          <>
          <Card style = {{marginTop : 40}}>
            <Card.Actions style = {{justifyContent : 'center',  alignItems: "center",}}>
              <Card.Title title= {account.firstname + ' ' + account.lastname}/>
            </Card.Actions>
          </Card>

          <Card style = {{marginTop : 20}}>
            <Card.Content>
              <Card.Title title= "Datos personales"/>
              <Paragraph>Correo : {account.email} </Paragraph>
              <Paragraph>Fecha de nacimiento : {account.birthdate}  </Paragraph>
              <Paragraph>Fecha de registro : {account.signindate} </Paragraph>
            </Card.Content>
          </Card>
          {(typeof(userId) !== 'undefined' && typeof(myAccount.id) !== 'undefined' && userId !== myAccount.id) && <Button mode="contained" onPress={addContact} style={{margin: 10}}> Añadir contacto </Button>}
          </>
          }
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