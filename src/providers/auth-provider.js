import firebase from "firebase/app";
import "firebase/auth";
import {FIREBASE_CONFIG, FACEBOOK_APP_ID, ANDROID_APP_CLIENT_ID, IOS_APP_CLIENT_ID} from '@env';
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth';

export function init(){
  return firebase.initializeApp(JSON.parse(FIREBASE_CONFIG));
};

export function establishObserver(navigation, nameConnect, nameDisconnect){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Se ha conectado');
    navigation.navigate(nameConnect);
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
  return firebase.auth().currentUser.getIdToken(forceRefresh);
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

	return error.message.concat('(',error.code,')');//'Error interno. Revise sus credenciales o inténtelo más tarde.';
};