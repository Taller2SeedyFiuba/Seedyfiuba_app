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

function MyProyectsRoute () {
  const [selectedId, setSelectedId] = React.useState(null);

  const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
      const color = item.id === selectedId ? 'white' : 'black';

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

  return (
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
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
	return(
		<View style={styles.container}>
			<Text>Account</Text>
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