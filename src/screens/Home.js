import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { Text, BottomNavigation, List, Avatar, Button, Card, Title, Paragraph, Divider, IconButton, TouchableRipple, Searchbar, RadioButton } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

const Tab = createMaterialTopTabNavigator();

function HomeRoute () {
  return (
      <Text> Texto </Text>
  );
  <Tab.Navigator>
    <Tab.Screen name='My Proyects' component={MyProyectsRoute} />
    <Tab.Screen name='Favourite Proyects' component={FavouriteProyectsRoute} />
  </Tab.Navigator>
}

function SearchRoute () {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [option, setOption] = React.useState('Proyect Geographic')

	return(
		<View style={{justifyContent:'flex-start', flex:1, marginLeft: '10%',
    maxWidth: '80%'}}>
      <View style={{justifyContent:'center', flex:1}}>
        <Searchbar
          placeholder='Buscar'
          onChangeText={searchQuery => setSearchQuery(searchQuery)}
          value={searchQuery}
        />
      </View>
			<View style={{justifyContent:'flex-start', flex:3}}>
        <List.Section title='Tipo de Búsqueda'>
          <RadioButton.Group
          value={option}
          onValueChange={value  => setOption(value)}>
          <RadioButton.Item label='Proyecto (Ubicación)' value='Proyect Geographic' color='#3C8C16' mode='android' />
          <RadioButton.Item label='Proyecto (Tipo)' value='Proyect Stage' color='#3C8C16' mode='android' />
          <RadioButton.Item label='Proyecto (Etapa)' value='Proyect Hashtag' color='#3C8C16' mode='android' />
          <RadioButton.Item label='Proyecto (Hashtag)' value='Proyect Type' color='#3C8C16' mode='android' />
          <RadioButton.Item label='Usuario' value='User' color='#3C8C16' mode='android' />
          </RadioButton.Group>
        </List.Section>
      </View>
		</View>
	);
}

const ChatRouteStack = createStackNavigator();

function MessageRoute (){
  return (
    <ChatRouteStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}
      initialRouteName='ChatHomeRoute'
    >
    <ChatRouteStack.Screen
        name='ChatHomeRoute'
        component={ChatHomeRoute}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon='message-plus'
              size={28}
              color='#ffffff'
            />
          )
        })}
    />
    <ChatRouteStack.Screen name='ChatRoute' component={ChatRoute} />
    </ChatRouteStack.Navigator>
  );
}

const ContactsItem = ({ item, onPress}) => (
    <TouchableRipple onPress = {onPress}>

    </TouchableRipple>
);

function ChatHomeRoute({navigation}) {
  const threads = [
    {
      _id: '2',
      name: 'Gonzalo',
    },
    {
      _id: '3',
      name: 'Ricardo',
    }];

    function navigatening(item){
      return navigation.navigate('ChatRoute', {thread : item })
    }

    const renderContactsItem = ({ item }) => (
      <ContactsItem item = {item} onPress={navigatening}/>
    );

  return (
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem= {({ item }) => (
          <TouchableRipple
            onPress={() => navigation.navigate('ChatRoute', { thread: item })}
          >
          <Text> {item.name} {'\n'} Conectado </Text>
          </TouchableRipple>
        )}
        />
  );
}

function ChatRoute ({route, navigation}) {
  const {thread} = route.params;
  const [messages, setMessages] = React.useState([
    {
      _id: 1,
      text: 'Hola Ernesto! Soy ' + thread.name,
      createdAt: new Date().getTime(),
      user: {
        _id: thread._id,
        name: thread.name,
      }
    }
  ]);
  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1 }}
    />
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

const HomeTab = createMaterialBottomTabNavigator();

function Home({ navigation }) {
  return (
    <HomeTab.Navigator
      initialRouteName="Inicio"
      activeColor="black"
      inactiveColor="#3C8C16"
      barStyle={{ backgroundColor: '#77A656' }}
    >
      <HomeTab.Screen
        name="Inicio"
        component={HomeRoute}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Búsqueda"
        component={SearchRoute}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Mensajes"
        component={MessageRoute}
        options={{
          tabBarLabel: 'Mensajes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Cuenta"
        component={AccountRoute}
        options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}

export {Home}