import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Tarjeta = () =>{
    return(
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>);
}

export {Tarjeta};