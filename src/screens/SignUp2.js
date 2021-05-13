import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { HelperText, Button } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';
import { SignInput } from './../SignComp.js';
import {showInvalidName, showInvalidBirthDate, showRegisterError } from './../SignErrors.js';

function SignUp2 ({ navigation, email}) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');

  const signUp2Register = () => {
    if(!showInvalidName(firstName) && !showInvalidName(firstName)){
      Auth.getIdToken(true).then((token) => {
        var data = {email : email, firstName : firstName,
         lastName : lastName, birthdate : birthDate};
         Client.sendData(token);
      }).catch((error) => {
        setErrorInfo(Auth.errorMessageTranslation(error));
      });
      navigation.navigate('Home');
    }
  };

  return (
    <View style={style.container}>
      <SignInput
        aLabel='Nombre'
        onChangeValue={firstName => setFirstName(firstName)}
        aValue={firstName}
        textError='Nombre inválido.'
        showInvalidValue={showInvalidName(firstName)}
        secureTextEntry={false}
      />

      <SignInput
        aLabel='Apellido'
        onChangeValue={lastName => setLastName(lastName)}
        aValue={lastName}
        textError='Apellido inválido.'
        showInvalidValue={showInvalidName(lastName)}
        secureTextEntry={false}
      />

      <SignInput
        aLabel='Fecha de nacimiento'
        onChangeValue={birthDate => setBirthDate(birthDate)}
        aValue={birthDate}
        textError='Fecha de nacimiento inválida.'
        showInvalidValue={showInvalidBirthDate(birthDate)}
        secureTextEntry={false}
      />

      <View style={StyleSheet.container, {alignItems: 'center'}}>
        <Button
            mode="contained"
            color="green"
            onPress={signUp2Register}
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

export { SignUp2 };
