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
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'account', title: 'Account', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#008F39' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export {Home}