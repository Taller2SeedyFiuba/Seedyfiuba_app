import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import * as Auth from './../providers/provider_firebase.js'


function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');

  const signUpRegister = () => {
    Auth.createUserWithMailAndPassword(email, password);
  };
  const hasInvalidEmail = () => {
    return (email != '') && (!email.includes('@'));
  };

  const hasInvalidPassword = () => {
    return (password != '') && (password.length < 5);
  };

  const hasInvalidConfirmPassword = () => {
    return (password != '') && (password != passwordConf);
  };

  return (
    <View style={style.container}>
      <TextInput
        label='E-mail'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <HelperText type="error" visible={hasInvalidEmail()}>
        Email inválido.
      </HelperText>
      <TextInput
        label='Usuario'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={username}
        onChangeText={username => setUsername(username)}
      />
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
      <TextInput
        label='Confirmar contraseña'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={passwordConf}
        secureTextEntry={true}
        onChangeText={passwordConf => setPasswordConf(passwordConf)}
      />
      <HelperText type="error" visible={hasInvalidConfirmPassword()}>
        Las contraseñas no coinciden
      </HelperText>
      <View style={StyleSheet.container, {alignItems: 'center'}}>
      <Button
          mode="contained"
          color="green"
          onPress={signUpRegister}
          style={{margin: 15}}
        >
          REGISTRARSE
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '60%',
    minHeight: 20,
    marginLeft : '20%',
  },
});

export { SignUp };
