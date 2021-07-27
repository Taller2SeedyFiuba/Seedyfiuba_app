import {USERS_URL, USERS_ME_URL, PROJECT_NEW_URL, PROJECT_ME_URL, PROJECT_ID_URL} from '@env';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

async function postData(url, token, data){
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    return response.json().then((resp) => resp.data);
  } else {
    const resp_1 = await response.json();
    resp_1.code = response.status;
    throw resp_1;
  }
};

async function patchData(url, token, data){
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    return response.json().then((resp) => resp.data);
  } else {
    const resp_1 = await response.json();
    resp_1.code = response.status;
    throw resp_1;
  }
};

async function getData(url, token){
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (response.ok) {
    return response.json().then((resp) => resp.data);
  } else {
    const resp_1 = await response.json();
    resp_1.code = response.status;
    throw resp_1;
  }
};


//Users

export async function getUserData(token){
  return await getData(USERS_ME_URL, token).catch((error) => {throw error});
}

export async function patchUserData(token, data){
  return await patchData(USERS_ME_URL, token, data).catch((error) => {throw error});
}

export async function getOtherUserData(token, id){
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/users/' + id + '/profile', token).catch((error) => {throw error});
}

export async function sendUserData(token, data){
  return await postData(USERS_URL, token, data).catch((error) => {throw error});
}

//Wallet

export async function getWalletData(token){
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/users/wallets/mine', token).catch((error) => {throw error});
}

export async function sendTransferData(token, data, projectId){
  return await postData('https://seedyfiuba-api-gateway.herokuapp.com/projects/' + projectId + '/sponsors', token, data).catch((error) => {throw error});
}
//Projects

export async function getProjectsMe(token, limit, page){
  return await getData(PROJECT_ME_URL + `?limit=${limit}&page=${page}`, token).catch((error) => {throw error});
}

export async function getProjectsID(token, id){
  return await getData(PROJECT_ID_URL + id, token).catch((error) => {throw error});
}

export async function sendNewProject(token, data){
  return await postData('https://seedyfiuba-api-gateway.herokuapp.com/projects', token, data).catch((error) => {throw error});
}

export async function patchProjectData(token, data, id){
  return await patchData(PROJECT_ID_URL + id, token, data).catch((error) => {throw error});
}

function querySearchString(query, limit, page){
  const queryArray = [];

  if (query.hasOwnProperty('tags')) {
    queryArray.push(query.tags.map((element) =>{return 'tags=' + element}).join('&'));
  } 

  if (query.hasOwnProperty('type')) {
    queryArray.push("type=" + query.type);
  } 

  if (query.hasOwnProperty('state')) {
    queryArray.push("state=" + query.state);
  } 

  if (query.hasOwnProperty('dist') && query.hasOwnProperty('lat') && query.hasOwnProperty('lng')) {
    queryArray.push("lat=" + query.lat);
    queryArray.push("lng=" + query.lng);
    queryArray.push("dist=" + query.dist);
  }

  queryArray.push("limit=" + limit);

  queryArray.push("page=" + page);

  return queryArray.join('&')
}

export async function getSearchProject(token, query, limit, page){
  console.log(querySearchString(query, limit, page))
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/projects/search?' + querySearchString(query, limit, page), token, {}).catch((error) => {throw error});
}

export async function sendFavouriteProject(token, id){
  return await postData('https://seedyfiuba-api-gateway.herokuapp.com/projects/' + id + '/favourites', token, {}).catch((error) => {throw error});
}

export async function getFavouriteProjects(token, limit, page){
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/favourites/mine' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
}

export async function getSponsoredProjects(token, limit, page){
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/sponsors/mine' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
}

export async function sendViewApply(token){
  return await postData('https://seedyfiuba-api-gateway.herokuapp.com/viewers', token, {}).catch((error) => {throw error});
}

export async function sendViewProject(token, id){
  return await postData('https://seedyfiuba-api-gateway.herokuapp.com/projects/' + id + '/review', token, {}).catch((error) => {throw error});
}

export async function sendVoteProject(token, projectId, actualstage){
  return await postData('https://seedyfiuba-api-gateway.herokuapp.com/projects/' + projectId + '/vote', token, {stage : actualstage}).catch((error) => {throw error});
}

export async function getViewableProjects(token, limit, page){
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/projects/review' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
}

export async function getViewProjects(token, limit, page){
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/viewers/mine' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
}


//Notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function sendNotificationTokenAux(token, notificationToken){
  console.log(notificationToken);
  return 'a';
  //return await postData('https://seedyfiuba-api-gateway.herokuapp.com/projects/' + id + '/favourites', token, {}).catch((error) => {throw error});
}

export async function sendNotificationToken(token){
  try{
    return registerForPushNotificationsAsync().then((notificationToken) => {
      console.log(notificationToken)
      var timer = setInterval( async () => {
        try{
          const result = await sendNotificationTokenAux(token, notificationToken);
          clearInterval(timer)
        }catch(error){}
      }, 5000);
    });
  }catch(error){
    console.log(error);
  }
}


function errorMessageTranslationAux(error){
  if (Math.floor(error.code / 500) == 5) return 'Intente más tarde';

  switch (error.message) {
    case 'id-in-use':
      return 'El id ya está en uso';

    case 'user-not-found':
      return 'Usuario no encontrado';

    case 'project-not-found':
      return 'Proyecto no encontrado';

    case 'project-is-favourite':
      return  'El proyecto ya es favorito';

    case 'user-is-viewer':
      return 'Ya eres veedor';

    case 'user-is-not-viewer':
      return 'No eres veedor';

    case 'user-is-viewing':
      return 'Ya te encuentras supervisando';

    case "edition-permissions":
      return 'No posees permisos de edición';

    case'owner-cant-sponsor':
      return 'No puedes patrocinar tu propio proyecto';

    case 'owner-cant-favourite':
      return 'No añadir a favoritos tu propio proyecto';

    case 'project-not-on-review':
      return 'El proyecto ya no se encuentra en búsqueda de Veedores';

    case 'owner-cant-review':
      return 'No puede supervisar su propio proyecto';

    case 'project-not-on-funding':
      return 'El proyecto ya no se encuentra en búsqueda de fondos';

    case 'missing-auth-header':
      return 'Falta el encabezado de Auth';

    case 'invalid-auth-header':
      return 'Encabezado de Auth inválido';

    case 'user-is-not-admin':
      return 'No eres administrador';

    case 'user-already-voted':
      return 'Ya has votado';

    case 'Project not in smart-contract':
      return 'El proyecto no forma parte del Smart Contract';

    case 'asked-resource-not-found':
    return 'No se encuentra el recurso solicitado';

    case 'database-connection-error':
    return 'Falla de conexión con la base de datos';

    case 'internal-service-req-error':
    return 'Falla de servicios internos';

    case 'unknown-error':
    return 'Error desconocido';

    case 'internal-server-error':
    return 'Falla interna del servidor';

  }

  return error.message; // 'Solicitud inválida, revise los campos indicados';
}

export function errorMessageTranslation(error){
   return 'Error ' + error.code + ' : ' + errorMessageTranslationAux(error);
};