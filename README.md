# Seedyfiuba app



## Introducción

Este proyecto reúne el código y los recursos destinados a la aplicación para teléfonos móviles que sirve de front-end para Seedyfiuba y conecta con servicios de terceros para facilitar algunas características de cara al usuario, como ser la autenticación y la subida de imágenes.



## Instalación

Crear un nuevo proyecto con Expo (https://expo.io/) y sobrescribir sus archivos con el contenido de este repositorio. Luego instalar las bibliotecas indicadas en la sección de dependencias manualmente o bien ejecutando el comando 

`npm install` en la raíz del proyecto.



## Organización

La aplicación se estructura como una serie de pantallas que muestran componentes y ejecutan funciones. Los navegadores modularizan el modo en que el usuario recorre dichas pantallas y los proveedores aíslan toda llamada a un servidor externo. Los elementos que corresponden a cada categoría se agrupan en carpetas homónimas en inglés:

src

-- components

-- functions

-- navigators

-- providers

-- screens



Es recomendable comenzar la exploración del código desde 'src/navigators/LoginNavigator.js' y leer la función 'establishObserver' de 'src/providers/auth-provider.js'.



## Dependencias:

#### React native paper

npm install react-native-paper



#### React navigation

npm install @react-navigation/native

npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

npm install @react-navigation/stack



### React Native Masked Text

npm install react-native-masked-text --save



### Moment

npm install moment --save



### Tab Based Navigation

npm install @react-navigation/material-top-tabs react-native-tab-view@^2.16.0



### Gifted Chat

npm install react-native-gifted-chat



### React Navigation Material Bottom Tabs

npm install @react-navigation/material-bottom-tabs react-native-paper



### React Native Vector Icons

npm install react-native-vector-icons



### React Native Dotenv

npm install react-native-dotenv



### Expo Facebook Auth

npm install expo-facebook



### Expo Google Auth

npm install expo-google-app-auth



### Expo Image Picker

npm install expo-image-picker



## React Native Draggable Grid

npm install react-native-draggable-grid



### Location

npm install react-native-google-places-autocomplete --save



### Picker

npm install react-native-picker-select

npm install @react-native-picker/picker



### Safe Area Provider

npm install react-native-safe-area-context

