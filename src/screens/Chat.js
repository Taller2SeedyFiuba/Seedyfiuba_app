import * as React from 'react';
import { View, FlatList} from 'react-native';
import { Text, Avatar, Title, Divider, TouchableRipple, Appbar } from 'react-native-paper';
import { GiftedChat, Bubble, Time} from 'react-native-gifted-chat';

import * as Auth from './../providers/auth-provider.js';
import * as Client from  './../providers/client-provider.js';

import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';

import {useTheme} from 'react-native-paper';
import {PreferencesContext} from '../components/PreferencesContext.js';


const ChatRouteStack = createStackNavigator();

export function Message (){
  const theme = useTheme();

  return (
    <ChatRouteStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        title : '',
      }}
      initialRouteName='ChatHomeRoute'
    >
    <ChatRouteStack.Screen name='ChatHomeRoute' component={ChatHomeRoute} options = {{title : 'Contactos'}}/>
    <ChatRouteStack.Screen name='ChatRoute' component={ChatRoute} options={({ route }) => ({ title: route.params.title, headerShown:true})}/>
    </ChatRouteStack.Navigator>
  );
}

function parseMessage(snapshot){
  const { createdAt, text, user } = snapshot.val();
  const { key: id } = snapshot;
  const { key: _id } = snapshot;

  const message = {
    id,
    _id,
    createdAt,
    text,
    user,
  };
  return message;
}

function parseContact(snapshot){
 const response = snapshot.val().data;

  const contact = {
    _id : response.id,
    name : response.name
  };
  return contact;
}

function determineRoom(userId, contactId){
    if ( userId < contactId) return userId.concat(contactId);
    return contactId.concat(userId);
}

function ChatHomeRoute({navigation}) {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = React.useState([]);
  const [user, setUser] = React.useState({
      name: '',
      _id: 0,
  });
  
  React.useEffect(() => {
    if(isFocused){

      const newUser = {};
      newUser._id = Auth.getUid();
      Auth.getContactsOff(user._id);
      setContacts([]);

      Auth.getIdToken(true).then((token) => {
        Client.getUserData(token).then((userInfo) =>{
           newUser.name = userInfo.firstname + userInfo.lastname;
           setUser(newUser);
        }).catch((error) => {
           console.log('Error:' + error)
        });
      }).catch((error) => {
         console.log(error);
         console.log(Auth.errorMessageTranslation(error));
      });

     Auth.getContactsOn(Auth.getUid(), (newContact) => {
        setContacts((prevState, props) => { return [parseContact(newContact), ... prevState]});
      });

    } else{
      Auth.getContactsOff(user._id);
      setContacts([]);
    }
  }, [isFocused]);

  return (
    <View>
      <Appbar.Header style={{height:50}}>
        <Appbar.Content title='Chat'/>
      </Appbar.Header>

      <FlatList
        data={contacts}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem= {({ item }) => (
          <TouchableRipple onPress={() => navigation.navigate('ChatRoute', {title: item.name, user: user, contact: item, room: determineRoom(Auth.getUid(), item._id) })}>
            <View style = {{flexDirection : 'row', alignItems : 'center'}}>
            <Avatar.Text size={32} label= {item.name[0]} />
            <Title style = {{marginBottom : 5}}> {item.name} </Title>
            </View>
          </TouchableRipple>
        )}
        />
    </View>
  );
}

function ChatRoute ({route, navigation}) {
  const {user, contact, room} = route.params;
  const [messages, setMessages] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if(isFocused){
      Auth.getMessagesOff(room);
      setMessages([]);

      Auth.getMessagesOn(room, (newMessage) => {
        setMessages((prevState, props) => {
        return [parseMessage(newMessage), ... prevState]});
      });
    } else{
      Auth.getMessagesOff(room);
      setMessages([]);
    }
  }, [isFocused]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(new_message) => {Auth.sendMessages(room, new_message)}}
      user={{_id : user._id}}
      alwaysShowSend
      placeholder='Escriba su mensaje aquí...'
      renderBubble = {renderBubble}
      renderTime = {renderTime}
      />
  );
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
        backgroundColor: '#9e9d9d',
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
          }}/>
    );
}
