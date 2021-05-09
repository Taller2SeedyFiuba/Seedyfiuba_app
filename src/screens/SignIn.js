import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import * as Auth from './../providers/provider_firebase.js';

function SignIn({ navigation }) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const signInRegister = () => {
    Auth.signInWithMailAndPassword(email, password).then((userCredential) => {
      // Ingresado
      var user = userCredential.user;
      navigation.navigate('Home');
    }).catch((error) => {
        setErrorInfo(Auth.errorMessageTranslation(error));
      });
  };

  const showRegisterError = () => {
    return errorInfo != '';
  };

  const showInvalidEmail = () => {
    return (email != '') && (!email.includes('@'));
  };

  const showInvalidPassword = () => {
    return (password != '') && (password.length < 6);
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
      
      <View style={StyleSheet.container, {alignItems: 'center'}}>
        <Button
          mode="contained"
          color="green"
          onPress={signInRegister}
          style={{margin: 10}}
        >
          INGRESAR
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
    textAlign: 'center',
    flex: 1,
    maxWidth: '60%',
    minHeight: 20,
    marginLeft : '20%'
  },
});

export { SignIn };
