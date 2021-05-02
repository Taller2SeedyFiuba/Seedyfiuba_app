import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Register({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Pedir edad, apodo, etc.</Text>
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

export { Register };
