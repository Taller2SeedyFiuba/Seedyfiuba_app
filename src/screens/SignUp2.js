import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { HelperText, Button, TextInput } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';
import { SignInput } from './../SignComp.js';
import {showInvalidName, showInvalidBirthDate, showRegisterError } from './../SignErrors.js';
import { DatePickerModal } from 'react-native-paper-dates';

function SignUp2 ({ navigation, email}) {
  const [errorInfo, setErrorInfo] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setBirthDate(params.date);
    },
    [setOpen, setBirthDate]
  );

  const signUp2Register = () => {
    if(!showInvalidName(firstName) && !showInvalidName(firstName)){
      Auth.getIdToken(true).then((token) => {
        var data = {email : email, firstName : firstName,
         lastName : lastName, birthdate : birthDate};
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
      label={birthDate ? `${birthDate.getDate()}/${birthDate.getMonth()+1}/${birthDate.getFullYear()}` : 'Fecha de nacimiento'}
      mode='outlined'
      dense={true}
      style={{margin:15}}
      disabled={false}
      onFocus={() => setOpen(true)}
      />
      <DatePickerModal
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          birthDate={birthDate}
          onConfirm={onConfirmSingle}
          saveLabel="Guardar" // optional
          label="Fecha Seleccionada" // optional
          validRange={{
            endDate: new Date(2021, 1, 1), // optional
          }}
        />

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
