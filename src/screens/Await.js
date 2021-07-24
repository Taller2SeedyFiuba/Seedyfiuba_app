import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ActivityIndicator, Button} from 'react-native-paper';
import * as Auth from '../providers/auth-provider.js'
import * as Client from  './../providers/client-provider.js';

export function Await({ route, navigation }) {

  const {token, email} = route.params;

  React.useEffect(() => {
    Client.getUserData(token).then(() => {
      navigation.navigate('Home');  
    }).catch((error) => {
      if(Math.floor(error.code / 100) == 4){
        navigation.navigate('SignUpData', {email : email})
      } else {
        console.log(error);
        Auth.signOut();
      }
    })
  }, [])


  return (
    <View style={styles.container}>
       <ActivityIndicator animating = {true} size = "large" style = {styles.activityIndicator}/>
       <Text> Conectando</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
