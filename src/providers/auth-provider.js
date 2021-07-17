import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/database';
import {Platform} from 'react-native';
import {FIREBASE_CONFIG, FACEBOOK_APP_ID, ANDROID_APP_CLIENT_ID, IOS_APP_CLIENT_ID} from '@env';
import * as Client from  './../providers/client-provider.js';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import uuid from "uuid";


//General /Auth
export function init(){
  if (!firebase.apps.length) {
     return firebase.initializeApp(JSON.parse(FIREBASE_CONFIG));
  }else {
     return firebase.app();
  }
};

export function establishObserver(navigation, nameConnect, nameDisconnect, nameGetData){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Se ha conectado');
    user.getIdToken(true).then((token) => {
          Client.getUserData(token).then(() => {
          navigation.navigate(nameConnect);  
        }).catch((error) => {
          if(Math.floor(error / 100) == 4){
            navigation.navigate(nameGetData, {email : user.email})
          } else {
            console.log(error);
          }
        })
    });
  } else {
    console.log('Se ha desconectado');
    navigation.navigate(nameDisconnect);
  }
  });
};

export function createUserWithMailAndPassword(email, password){
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export function signInWithMailAndPassword(email, password){
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export function getIdToken(forceRefresh){
  return firebase.auth().currentUser?.getIdToken(forceRefresh);
};

export function signOut(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};

export function sendPasswordResetEmail(email){
  firebase.auth().sendPasswordResetEmail(email);
};

export async function logInWithFacebook() {
  await Facebook.initializeAsync({
    appId: FACEBOOK_APP_ID
  }
    );
    return await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
  }
  
export function getCredentialFacebook(token) {
  return firebase.auth.FacebookAuthProvider.credential(token);
}

export async function logInWithGoogle() {
  return await Google.logInAsync({
    androidClientId: ANDROID_APP_CLIENT_ID,
    iosClientId: IOS_APP_CLIENT_ID,
    scopes: ['profile', 'email']
  });
}

export function getCredentialGoogle(idToken, accessToken) {
  return firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
}

export function signInWithCredential(credential) {
  return firebase.auth().signInWithCredential(credential);
}

export function errorMessageTranslation(error){
	switch (error.code) {
    case 'auth/email-already-exists':
      return 'El correo electrónico ya está asosiado a una cuenta.';

    case 'auth/invalid-email':
      return 'El corre electrónico no es válido.';

    case 'auth/invalid-password':
      return 'La contraseña no es válida.';

    case 'auth/wrong-password':
      return 'La contraseña no es correcta.'

    case 'auth/user-not-found':
      return 'El usuario indicado no existe.';
  }

	return 'Error interno. Revise sus credenciales o inténtelo más tarde.';//error.message.concat('(',error.code,')');
};


//Storage
export async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  //blob.close();

  return await snapshot.ref.getDownloadURL();
};

export async function uploadImage(uri, progressCallback){
  const filename = uri.toString();
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const uploadTask = firebase.storage().ref(filename).putFile(uploadUri);

  uploadTask.on('state_changed', (snapshot) => {progressCallback(snapshot.bytesTransferred / snapshot.totalBytes * 10000)});
  
  try {
    await uploadTask;
  }catch (error){
    throw error;
  }

  return await uploadTask.snapshot.ref.getDownloadURL();
};


// Messages / Chat

export function getUid(){
  return (firebase.auth().currentUser || {}).uid;
};

function parseSnapshot(snapshot) {
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
};

function getTimestamp() {
  return firebase.database.ServerValue.TIMESTAMP;
};

export function sendMessages(room, messages){
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];
    const message = {
      user,
      text,
      createdAt: getTimestamp(),
    };
    firebase.database().ref('Messages/' + room).push(message);
  }
};

export function getMessagesOn(room, callback){
  firebase.database().ref('Messages/' + room).limitToLast(20).on('child_added', snapshot => callback(snapshot));
};

export function getMessagesOff(room){
  firebase.database().ref('Messages/' + room).off();
};


export function sendContact(userId, userName, contactId, contactName){
  firebase.database().ref('Contacts/' + userId).push({id : contactId, name : contactName});
  firebase.database().ref('Contacts/' + contactId).push({id : userId, name: userName});
};

export function getContactsOn(userId, callback){
  firebase.database().ref('Contacts/' + userId).limitToLast(20).on('child_added', snapshot => callback(snapshot));
};

export function getConstactsOff(userId){
  firebase.database().ref('Contacts/' + userId).off();
};