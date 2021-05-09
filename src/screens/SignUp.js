import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import * as Auth from './../providers/provider_firebase.js';

function SignUp({ navigation }) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');

  const signUpRegister = () => {
  if(email.includes('@') && password == passwordConf){
    Auth.createUserWithMailAndPassword(email, password).then((userCredential) => {
     // Registrado
      var user = userCredential.user;
      navigation.navigate('Home');
    }).catch((error) => {
        setErrorInfo(Auth.errorMessageTranslation(error));
      });
    }
  };

  const showInvalidEmail = () => {
    return (email != '') && (!email.includes('@'));
  };

  const showInvalidPassword = () => {
    return (password != '') && (password.length < 6);
  };

  const showInvalidConfirmPassword = () => {
    return (passwordConf.length >= password.length) && (password != passwordConf);
  };

  const showRegisterError = () => {
    return errorInfo != '';
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
      <HelperText type="error" visible={showInvalidEmail()}>
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
      <HelperText type="error" visible={showInvalidPassword()}>
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
      <HelperText type="error" visible={showInvalidConfirmPassword()}>
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
      <HelperText type="error" visible={showRegisterError()}>
        {errorInfo}
      </HelperText>
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
