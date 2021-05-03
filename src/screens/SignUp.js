import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SignUp({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Pedir username, password, email y poner boton de registro</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SignUp };
