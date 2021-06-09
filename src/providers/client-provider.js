import {USERS_URL, USERS_ME_URL, PROJECT_NEW_URL, PROJECT_ME_URL, PROJECT_ID_URL} from '@env';

function sendData(url, token, data){
  return fetch(url, {
  	method: 'POST',
  	//mode : 'no-cors',
  	body: JSON.stringify(data),
  	headers: {
      'Authorization': 'Bearer ' + token,
  		'Content-Type': 'application/json'
  	}
  }).then((resp) => resp.json()).then((response) => {
    if(response.ok || response.status == 'success'){
      return response.data;
    }else{
      throw "Network error";
    }
  });
};

function getData(url, token){
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
      }
  }).then((resp) => resp.json()).then((response) => {
    if(response.ok || response.status == 'success'){
      return response.data;
    }else{
      throw "Network error";
    }
  });
};


//Users

export async function getUserData(token){
  return await getData(USERS_ME_URL, token).catch((error) => {throw error});
}

export async function sendUserData(token, data){
  return await sendData(USERS_ME, token, data).catch((error) => {throw error});
}


//Projects

export async function getProjectsMe(token){
  return await getData(PROJECT_ME_URL, token).catch((error) => {throw error});
}

export async function getProjectsID(token, id){
  return await getData(PROJECT_ID_URL + id, token).catch((error) => {throw error});
}

export async function sendNewProject(token, data){
  return await sendData(PROJECT_NEW_URL, token, data).catch((error) => {throw error});
}
