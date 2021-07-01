import * as React from 'react';
import {useWindowDimensions, ImageBackground, View, ScrollView, StyleSheet} from 'react-native';
import { ActivityIndicator, TextInput, useTheme, TouchableRipple, Button, IconButton, Card, Paragraph, Appbar, Switch, Text } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
import * as Client from './../providers/client-provider.js';
import { useIsFocused } from '@react-navigation/native';
import imgSrc from '../../img/paz2.png';

export function OtherAccount ({route, navigation}) {
  const {userId} = route.params;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [account, setAccount] = React.useState('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
        Client.getOtherUserData(token, userId).then((response) => {
          setAccount(response);
        }).catch((error) => {

        });
    }).catch((error) => {

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
              <Paragraph>Fecha de registro   : {account.signindate} </Paragraph>
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