import * as React from 'react';
import { View } from 'react-native';
import { Text, BottomNavigation } from 'react-native-paper';

const HomeRoute = () => {
	return(
		<View>
			<Text>Home</Text>
		</View>
	)
}

const AccountRoute = () => {
	return(
		<View>
			<Text>Account</Text>
		</View>
	)
}

export function Home({ navigation }) {
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
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}