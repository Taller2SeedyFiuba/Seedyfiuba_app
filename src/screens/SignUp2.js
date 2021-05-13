import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { HelperText, Button, TextInput } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';
import { SignInput } from '../components/SignComp.js';
import {showInvalidName, showInvalidBirthDate, showRegisterError } from '../functions/SignErrors.js';
import { TextInputMask } from 'react-native-masked-text';

function SignUp2 ({ route, navigation }) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const {email} = route.params;

  const signUp2Register = () => {
    var letters = /^[A-Za-z]+$/;
    if(firstName != '' && lastName != '' && firstName.match(letters) && firstName.match(letters) && birthDate.length >= 8 && (!showInvalidBirthDate(birthDate))){
      Auth.getIdToken(true).then((token) => {
        var data = {email : email, firstname : firstName,
         lastname : lastName, birthdate : birthDate};
         Client.sendData(token, data);
         navigation.navigate('Home');
      }).catch((error) => {
        setErrorInfo(Auth.errorMessageTranslation(error));
      });
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

      <TextInput
        label='Fecha de nacimiento'
        value={birthDate}
        placeholder='YYYY-MM-DD'
        onChangeText={birthDate => setBirthDate(birthDate)}
        mode='outlined'
        dense={true}
        style={{margin:15}}
        render={props =>
          <TextInputMask
          {...props}
            type={'datetime'}
            options={{
              format: 'YYYY-MM-DD'
            }}
          />
        }
      />
      <HelperText type="error" visible={showInvalidBirthDate(birthDate)}>
      Fecha Inválida
      </HelperText>

      <View style={{alignItems: 'center'}}>
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
