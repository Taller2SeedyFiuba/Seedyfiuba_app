import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { Button, Card, Paragraph, Appbar } from 'react-native-paper';

function AccountRoute () {
  const account = {firstname : 'Ernesto' , lastname : 'Nuñez', age :'36'}
  return (
    <View style={{justifyContent:'center', flex:1}}>
    <Appbar.Header style={{ backgroundColor: '#77A656'}}>
      <Appbar.Content title='Cuenta' color ='white'/>
    </Appbar.Header>
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Card.Cover source={{ uri: 'https://www.ecestaticos.com/imagestatic/clipping/d8c/0e3/d8c0e34cd5efbe2f87112e3e442aa449.jpg'}}/>
          <Paragraph>Nombre : {account.firstname} {account.lastname}</Paragraph>
          <Paragraph>Edad : {account.age}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Modificar</Button>
          <Button>Denunciar</Button>
        </Card.Actions>
      </Card>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '10%',
    maxWidth: '80%',
},
scrollView: {
    marginHorizontal: 0,
} ,
title: {
    fontSize: 32,
},
})

export {AccountRoute}