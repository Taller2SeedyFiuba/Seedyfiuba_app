import * as React from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8G1wvl54_IRTAeovpZpejhIrDxYm_q7o",
  authDomain: "seedyfiuba-autenticacion.firebaseapp.com",
  projectId: "seedyfiuba-autenticacion",
  storageBucket: "seedyfiuba-autenticacion.appspot.com",
  messagingSenderId: "261422775782",
  appId: "1:261422775782:web:426e4ed7f29d650a3d2a27",
  measurementId: "G-XPS2V73FZN"
};

export function init(){
		return firebase.initializeApp(firebaseConfig);
};

export function createUserWithMailAndPassword(email, password){
		return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export function signInWithMailAndPassword(email, password){
		return firebase.auth().signInWithEmailAndPassword(email, password);
};

export function errorMessageTranslation(errorCode){
	switch (errorCode) {
          case 'auth/email-already-exists':
            return 'El correo electrónico ya está asosiado a una cuenta.';

          case 'auth/invalid-email':
            return 'El corre electrónico no es válido.';

          case 'auth/invalid-password':
            return 'La contraseña no es válida.';
    }

	return 'Error interno. Revise sus credenciales o inténtelo más tarde.';
}