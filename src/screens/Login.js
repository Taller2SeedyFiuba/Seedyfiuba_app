import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button as PaperButton, List } from 'react-native-paper';

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{flex:2}}>
        <Image source={require('../../img/seedyfiubalogo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <PaperButton
          mode="contained"
          color="green"
          onPress={() => alert("Login Button")}
          style={{margin: 10}}
        >
          INGRESAR
        </PaperButton>
        <PaperButton
          mode="contained"
          color="green"
          onPress={() => navigation.navigate('Register')}
          style={{margin: 10}}
        >
          REGISTRARSE
        </PaperButton>
      </View>
      <View style={styles.container}>
        <Text style={{margin: 10}}>O CONECTARSE CON</Text>
        <List.Section>
          <View style={styles.row}>
            <PaperButton
              mode="contained"
              color="blue"
              onPress={() => navigation.navigate('Register')}
              style={{margin: 10}}
              icon={require('../../img/facebook.png')}
            >
              FACEBOOK
            </PaperButton>
            <PaperButton
              mode="contained"
              color="red"
              onPress={() => navigation.navigate('Register')}
              style={{margin: 10}}
              icon={require('../../img/google.png')}
            >
              GOOGLE
            </PaperButton>
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