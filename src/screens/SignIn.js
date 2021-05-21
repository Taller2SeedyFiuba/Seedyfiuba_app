import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { HelperText, Button } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';
import { SignInput } from '../components/SignComp.js'
import { showInvalidEmail, showInvalidPassword, showRegisterError } from '../functions/SignErrors.js'

function SignIn ({ navigation }) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const signInRegister = () => {
    Auth.signInWithMailAndPassword(email, password).then((userCredential) => {
      Auth.getIdToken(true).then((token) => {
        console.log(Client.getData(token));
        navigation.navigate('Home');
      });
    }).catch((error) => {
        setErrorInfo(Auth.errorMessageTranslation(error));
      });
  };

  return (
    <View style={style.container}>
      <SignInput
        aLabel='E-Mail'
        onChangeValue={email => setEmail(email)}
        aValue={email}
        textError='Email inválido.'
        showInvalidValue={showInvalidEmail(email)}
        secureTextEntry={false}
      />

      <SignInput
        aLabel='Contraseña'
        onChangeValue={password => setPassword(password)}
        aValue={password}
        textError='Contraseña muy corta.'
        showInvalidValue={showInvalidPassword(password)}
        secureTextEntry={true}
      />
      
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
    flex: 1,
    maxWidth: '60%',
    minHeight: 20,
    marginLeft: '20%',
    justifyContent: 'center'
  },
});

export { SignIn };
