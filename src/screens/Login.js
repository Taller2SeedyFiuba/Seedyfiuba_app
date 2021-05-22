import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, List } from 'react-native-paper';

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{flex:2}}>
        <Image source={require('../../img/seedyfiubalogo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}
          style={{margin: 10}}
        >
          INGRESAR
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('SignUp')}
          style={{margin: 10}}
        >
          REGISTRARSE
        </Button>
      </View>
      <View style={styles.container}>
        <Text style={{margin: 10}}>O CONECTARSE CON</Text>
        <List.Section>
          <View style={styles.row}>
            <Button
              mode="contained"
              color="blue"
              onPress={() => alert("BOTON FACEBOOK")}
              style={{margin: 10}}
              icon={require('../../img/facebook.png')}
            >
              FACEBOOK
            </Button>
            <Button
              mode="contained"
              color="red"
              onPress={() => alert("BOTON GOOGLE")}
              style={{margin: 10}}
              icon={require('../../img/google.png')}
            >
              GOOGLE
            </Button>
          </View>
        </List.Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    flex:1,
    aspectRatio: 0.9,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
})

export {Login};