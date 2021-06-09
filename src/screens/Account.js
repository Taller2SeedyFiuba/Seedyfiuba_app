import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { useTheme, TouchableRipple, Button, Card, Paragraph, Appbar, Switch, Text } from 'react-native-paper';
import {PreferencesContext} from '../components/PreferencesContext.js';
import * as Auth from './../providers/auth-provider.js';
import * as Client from './../providers/client-provider.js';

function Account () {
  const theme = useTheme();
  const {toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const [account, setAccount] = React.useState('');
  React.useEffect(() => {
    Auth.getIdToken(true).then((token) => {
      try{
        Client.getUserData(token).then((response) => {
          setAccount(response);
        });
      }catch(error){
        Auth.signOut();
      }
    });
  }, [])
  
  return (
    <View style={{justifyContent:'center', flex:1}}>
    <Appbar.Header>
      <Appbar.Content title='Cuenta'/>
    </Appbar.Header>
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Card.Cover source={{ uri: 'https://www.ecestaticos.com/imagestatic/clipping/d8c/0e3/d8c0e34cd5efbe2f87112e3e442aa449.jpg'}}/>
          <Paragraph>Nombre : {account.firstname} {account.lastname}</Paragraph>
          <Paragraph>Correo : {account.email}</Paragraph>
          <Paragraph>Fecha de nacimiento : {account.birthdate}</Paragraph>
        </Card.Content>
        <Card.Actions>
        <Text> Tema:  </Text>
        <TouchableRipple onPress={() => toggleTheme()}>
          <Switch value={isThemeDark}/>
        </TouchableRipple>
        </Card.Actions>
      </Card>
    </View>
    <Button
      mode="contained"
      onPress={() => Auth.signOut()}
      style={{margin: 10}}
    >
      Cerrar sesion
    </Button>
    </View>
  );
}

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

export {Account}