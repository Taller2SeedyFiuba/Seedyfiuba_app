import * as React from 'react';
import { View, FlatList} from 'react-native';
import { Avatar, Title, Divider, TouchableRipple } from 'react-native-paper';
import { GiftedChat, Bubble, Time} from 'react-native-gifted-chat';
import { createStackNavigator } from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import {PreferencesContext} from '../components/PreferencesContext.js';

const ChatRouteStack = createStackNavigator();

function Message (){
  const theme = useTheme();

  return (
    <ChatRouteStack.Navigator
      screenOptions={{
        headerShown: true,
        animationEnabled: false,
        title : '',
      }}
      initialRouteName='ChatHomeRoute'
    >
    <ChatRouteStack.Screen name='ChatHomeRoute' component={ChatHomeRoute} options = {{title : 'Contactos'}}/>
    <ChatRouteStack.Screen name='ChatRoute' component={ChatRoute} options={({ route }) => ({ title: route.params.name })}/>
    </ChatRouteStack.Navigator>
  );
}

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

  return (
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem= {({ item }) => (
          <TouchableRipple onPress={() => navigation.navigate('ChatRoute', { name: item.name, thread: item })}>
            <View style = {{flexDirection : 'row'}}>
            <Avatar.Text size={32} label= {item.name[0]} />
            <Title> {item.name} {'\n'}</Title>
            </View>
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

  function renderBubble(props) {
    return ( <Bubble {...props}
        textStyle={{
          right: {
              color: 'white'
          },
          left: {
              color: 'white'
          }
        }}
        wrapperStyle={{
        left: {
          backgroundColor: '#77A656',
        },
        right: {
          backgroundColor: '#77A656',
        }
      }}/>
    );
  }

  function renderTime(props) {
    return (
          <Time
            {...props}
            timeTextStyle={{
              right: {
                color: 'white'
              },
              left: {
                color: 'white'
              }
            }}
          />
      );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1 }}
      alwaysShowSend
      placeholder='Escriba su mensaje aquí...'
    />
  );
}

export {Message}