import * as React from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import { Text, Avatar, Button, Card, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon='folder' />

const DATA = [
  {
    id: '1',
    title: 'Salvemos a la Antártida',
    description : 'Una descripción.'
  },
  {
    id: '2',
    title: 'Demos vuelta a la Torre Eiffel',
    description : 'Una descripción.'
  },
  {
    id: '3',
    title: 'Nigerian Prince needs bankary transference',
    description : 'Una descripción.'
  },
  {
    id: '5',
    title: 'Salvemos a la Antártida Otra Vez',
    description : 'Una descripción.'
  },
  {
    id: '6',
    title: 'Diseñemos ejemplos más creativos',
    description : 'Una descripción.'
  },
];

function renderItem({item}){
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={item.title} left={LeftContent} />
        <Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Ver</Button>
          <Button>Denunciar</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

function MyProyects () {
  return (
      <FlatList
        data={DATA}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
        //extraData={selectedId}
      />
  );
}

function FavouriteProyects () {
  return(
    <View style={styles.container}>
      <Text>Favourite proyects</Text>
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

export {FavouriteProyects, MyProyects}