import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, List } from 'react-native-paper';


export function Home({ navigation }) {
	return (
		<View 
		style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      	}}>
			<Text> Bienvenido </Text>
		</View>
	);
}