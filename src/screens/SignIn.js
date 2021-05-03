import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SignIn({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Pedir username, password y poner boton de ingreso</Text>
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

export { SignIn };
