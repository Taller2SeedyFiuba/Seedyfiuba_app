import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { HelperText, Button } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
import { SignInput } from '../components/SignComp.js';
import {showInvalidEmail, showInvalidPassword, showInvalidConfirmPassword, showRegisterError} from '../functions/SignErrors.js';

function SignUp ({ navigation }) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');

  const disableButton = () => {
    return !(email.includes('@') &&  (password.length > 5) && password == passwordConf);
  };

  const signUpRegister = () => {
    Auth.createUserWithMailAndPassword(email, password).catch((error) => {
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
        maxLength={100}
      />

      <SignInput
        aLabel='Contraseña'
        onChangeValue={password => setPassword(password)}
        aValue={password}
        textError='Contraseña muy corta.'
        showInvalidValue={showInvalidPassword(password)}
        secureTextEntry={true}
        maxLength={80}
      />

      <SignInput
        aLabel='Confirmar contraseña'
        onChangeValue={passwordConf => setPasswordConf(passwordConf)}
        aValue={passwordConf}
        textError='Las contraseñas no coinciden.'
        showInvalidValue={showInvalidConfirmPassword(password, passwordConf)}
        secureTextEntry={true}
        maxLength={80}
      />

      <View style={StyleSheet.container, {alignItems: 'center'}}>
        <Button
            mode="contained"
            onPress={signUpRegister}
            disabled={disableButton()}
            style={{margin: 15}}
          >
            REGISTRARSE
          </Button>
        <HelperText type="error" visible={showRegisterError(errorInfo)}>
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

export { SignUp };
