import firebase from "firebase/app";
import "firebase/auth";
import {FIREBASE_CONFIG} from '@env';

export function init(){
		return firebase.initializeApp(FIREBASE_CONFIG);
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