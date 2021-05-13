import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, BottomNavigation } from 'react-native-paper';

function HomeRoute () {
	return(
		<View style={styles.container}>
			<Text>Home</Text>
		</View>
	)
}

function SearchRoute () {
	return(
		<View style={styles.container}>
			<Text>Search</Text>
		</View>
	)
}

function MessageRoute () {
	return(
		<View style={styles.container}>
			<Text>Message</Text>
		</View>
	)
}

function AccountRoute () {
	return(
		<View style={styles.container}>
			<Text>Account</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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