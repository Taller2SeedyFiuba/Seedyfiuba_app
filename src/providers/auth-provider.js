import firebase from "firebase/app";
import "firebase/auth";
import {FIREBASE_CONFIG} from '@env';

export function init(){
  return firebase.initializeApp(JSON.parse(FIREBASE_CONFIG));
};

export function establishObserver(navigation, name){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Se ha conectado');
  } else {
    console.log('Se ha desconectado');
    navigation.navigate(name);
  }
  });
}
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
}