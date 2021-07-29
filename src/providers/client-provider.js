import {BASE_URL, USERS_URL, PROJECTS_URL, SPONSORS_URL, FAVOURITES_URL, NOTIFICATIONS_URL, VIEWERS_URL} from '@env';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

//API REST
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

async function putData(url, token, data){
  const response = await fetch(url, {
    method: 'PUT',
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

async function removeData(url, token, data){
  const response = await fetch(url, {
    method: 'DELETE',
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

//Users

export async function getUserData(token){
  return await getData(BASE_URL + USERS_URL + 'me', token).catch((error) => {throw error});
}

export async function patchUserData(token, data){
  return await patchData(BASE_URL + USERS_URL + 'me', token, data).catch((error) => {throw error});
}

export async function getOtherUserData(token, id){
  return await getData(BASE_URL + USERS_URL + id + '/profile', token).catch((error) => {throw error});
}

export async function sendUserData(token, data){
  return await postData(BASE_URL + USERS_URL, token, data).catch((error) => {throw error});
}

//Sponsors / Wallet 

export async function getWalletData(token){
  return await getData(BASE_URL + USERS_URL + 'wallets/mine', token).catch((error) => {throw error});
}

export async function sendTransferData(token, data, projectId){
  return await postData(BASE_URL + PROJECTS_URL + projectId + '/sponsors', token, data).catch((error) => {throw error});
}

export async function getSponsoredProjects(token, limit, page){
  return await getData(BASE_URL + SPONSORS_URL + '/mine' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
}

//Projects

export async function getProjectsMe(token, limit, page){
  return await getData(BASE_URL + USERS_URL + 'projects/mine' + `?limit=${limit}&page=${page}`, token).catch((error) => {throw error});
}

export async function getProjectsID(token, id){
  return await getData(BASE_URL + PROJECTS_URL + id, token).catch((error) => {throw error});
}

export async function sendNewProject(token, data){
  return await postData(BASE_URL + PROJECTS_URL, token, data).catch((error) => {throw error});
}

export async function patchProjectData(token, data, id){
  return await patchData(BASE_URL + PROJECTS_URL + id, token, data).catch((error) => {throw error});
}

//Search

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
  //console.log(querySearchString(query, limit, page))
  return await getData(BASE_URL + PROJECTS_URL  + 'search?' + querySearchString(query, limit, page), token, {}).catch((error) => {throw error});
}


//Favourite
export async function sendFavouriteProject(token, id){
  return await postData(BASE_URL + PROJECTS_URL  + id + '/favourites', token, {}).catch((error) => {throw error});
}

export async function removeFavouriteProject(token, id){
  return await removeData(BASE_URL + PROJECTS_URL  + id + '/favourites', token, {}).catch((error) => {throw error});
}

export async function getFilteredFavouriteProjects(token, projectId){
  return await getData(BASE_URL + FAVOURITES_URL + 'mine' + `?projectid=${projectId}`, token, {}).catch((error) => {throw error});
}

export async function getFavouriteProjects(token, limit, page){
  return await getData(BASE_URL + FAVOURITES_URL + 'mine' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
}

//Subscribers

export async function sendSubscribedProjects(token, projectId){
  return await postData(BASE_URL + PROJECTS_URL  + projectId + '/notifications', token, {}).catch((error) => {throw error});
}

export async function removeSubscribedProjects(token, projectId){
  return await removeData(BASE_URL + PROJECTS_URL  + projectId + '/notifications', token, {}).catch((error) => {throw error});
}

export async function getSubscribedProjects(token, projectId){
  return await getData(BASE_URL + NOTIFICATIONS_URL + '/mine' + `?projectid=${projectId}`, token, {}).catch((error) => {throw error});
}

//Viewers

export async function sendViewApply(token){
  return await postData(BASE_URL + VIEWERS_URL , token, {}).catch((error) => {throw error});
}

export async function sendViewProject(token, id){
  return await postData(BASE_URL + PROJECTS_URL  + id + '/review', token, {}).catch((error) => {throw error});
}

export async function sendVoteProject(token, projectId, actualstage){
  return await postData(BASE_URL + PROJECTS_URL  + projectId + '/vote', token, {stage : actualstage}).catch((error) => {throw error});
}

export async function getViewableProjects(token, limit, page){
  return await getData(BASE_URL + PROJECTS_URL  + '/review' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
}

export async function getFilteredViewProjects(token, projectId){
  return await getData(BASE_URL + VIEWERS_URL + '/mine' + `?projectid=${projectId}`, token, {}).catch((error) => {throw error});
}

export async function getViewProjects(token, limit, page){
  return await getData(BASE_URL + VIEWERS_URL + '/mine' + `?limit=${limit}&page=${page}`, token, {}).catch((error) => {throw error});
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
  const parsedNotificationToken = notificationToken.substring(notificationToken.indexOf("[") + 1, notificationToken.lastIndexOf("]"));
  return await putData(BASE_URL + NOTIFICATIONS_URL, token, {token: parsedNotificationToken}).catch((error) => {throw error});
}

export async function sendNotificationToken(token){
  try{
    return registerForPushNotificationsAsync().then((notificationToken) => {
      var timer = setInterval( async () => {
        try{
          const result = await sendNotificationTokenAux(token, notificationToken);
          clearInterval(timer)
        }catch(error){}
      }, 15000);
    });
  }catch(error){
    console.log(error);
  }
}


function errorMessageTranslationAux(error){
  if (Math.floor(error.code / 500) == 5) return 'Error interno. Intente más tarde';

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

  return 'Solicitud inválida'; // error.message;
}

export function errorMessageTranslation(error){
   return  errorMessageTranslationAux(error); // 'Error ' + error.code + ' : ' + errorMessageTranslationAux(error)
};