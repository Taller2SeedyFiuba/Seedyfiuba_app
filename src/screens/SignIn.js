import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';

function SignIn({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const hasInvalidUser = () => {
    return !username.includes('@');
  };

  const hasInvalidPassword = () => {
    return (password.length < 5);
  };

  return (
    <View style={style.container}>
      <TextInput
        label='Usuario'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={username}
        onChangeText={username => setUsername(username)}
      />
      <HelperText type="error" visible={hasInvalidUser()}>
        Email inválido.
      </HelperText>
      <TextInput
        label='Contraseña'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={password}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <HelperText type="error" visible={hasInvalidPassword()}>
        Contraseña muy corta.
      </HelperText>
      
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
