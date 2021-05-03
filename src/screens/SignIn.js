import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function SignIn({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={style.container}>
      <TextInput
        label='usuario'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={username}
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        label='contraseña'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={password}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      
      <View style={StyleSheet.container, {alignItems: 'center'}}>
        <Button
          mode="contained"
          color="green"
          onPress={() => alert(`Usuario: ${username}\nContraseña: ${password}`)}
          style={{margin: 10}}
        >
          INGRESAR
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export { SignIn };
