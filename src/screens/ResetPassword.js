import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { HelperText, Button } from 'react-native-paper';
import * as Auth from '../providers/auth-provider.js';
import { SignInput } from '../components/SignComp.js';
import { showInvalidEmail, showInvalidPassword, showRegisterError } from '../functions/SignErrors.js';

function ResetPassword ({ navigation }) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [email, setEmail] = React.useState('');
  
  const disableButton = () => {
    return !(email.includes('@'));
  };

  const resetPassword = () => {
    Auth.sendPasswordResetEmail(email);
    Auth.signOut();
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

      <View style={StyleSheet.container, {alignItems: 'center'}}>
        <Button
          mode="contained"
          onPress={resetPassword}
          style={{margin: 10}}
          disabled={disableButton()}
        >
          ENVIAR CORREO
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

export { ResetPassword };
