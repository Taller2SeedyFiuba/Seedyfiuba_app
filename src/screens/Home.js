import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity  } from 'react-native';
import { Text, BottomNavigation, List, Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

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

function MyProyectsRoute () {
  return (
      <FlatList
        data={DATA}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
        //extraData={selectedId}
      />
  );
}

function FavouriteProyectsRoute () {
  return(
    <View style={styles.container}>
      <Text>Favourite proyects</Text>
    </View>
  );
}

function HomeRoute () {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'myProyects', title: 'Mis proyectos', icon: 'home' },
    { key: 'favouriteProyects', title: 'Favoritos', icon: 'magnify' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    myProyects: MyProyectsRoute,
    favouriteProyects: FavouriteProyectsRoute,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#77A656' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

function SearchRoute () {
	return(
		<View style={styles.container}>
			<Text>Search</Text>
		</View>
	);
}

function MessageRoute () {
	return(
		<View style={styles.container}>
			<Text>Message</Text>
		</View>
	);
}

function AccountRoute () {
  const account = {firstname : 'Ernesto' , lastname : 'Nuñez', age :'36'}
  return (
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

function Home({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Inicio', icon: 'home' },
    { key: 'search', title: 'Búsqueda', icon: 'magnify' },
    { key: 'message', title: 'Mensajes', icon: 'chat' },
    { key: 'account', title: 'Cuenta', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    message: MessageRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#77A656' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export {Home}