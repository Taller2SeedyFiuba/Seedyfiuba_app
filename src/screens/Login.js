import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

function Login({ navigation }) {
  return (
    <View style={style.container}>
      <LogInButton onPress={() => navigation.navigate('Login')}/>

      <Button
        title="Registro"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const LogInButton = () => (
  <PaperButton
    mode="contained"
    color="green"
    onPress={() => alert("Login Button")}
  >
    LOG IN
  </PaperButton>
);


const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})


export {Login};