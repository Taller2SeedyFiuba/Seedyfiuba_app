import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');

  return (
    <View style={style.container}>
      <TextInput
        label='email'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        label='usuario'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={username}
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        label='contraseña'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={password}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <TextInput
        label='confirmar contraseña'
        mode='outlined'
        dense={true}
        style={{margin:15}}
        value={passwordConf}
        secureTextEntry={true}
        onChangeText={passwordConf => setPasswordConf(passwordConf)}
      />
      <View style={StyleSheet.container, {alignItems: 'center'}}>
      <Button
          mode="contained"
          color="green"
          onPress={() => alert(`Email: ${email}\nUsuario: ${username}\nContraseña: ${password}\nContraseña2: ${passwordConf}`)}
          style={{margin: 10}}
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
    marginLeft : '20%'
  },
});

export { SignUp };
