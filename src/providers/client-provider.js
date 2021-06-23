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
  }).then((response) => {
    if(response.ok){
      return response.json().then((resp) => resp.data);
    }else{
      throw response.status;
    }
  });
};

function getData(url, token){
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
      }
  }).then((response) => {
    if(response.ok){
      return response.json().then((resp) => resp.data);
    }else{
      throw response.status;
    }
  });
};


//Users

export async function getUserData(token){
  return await getData(USERS_ME_URL, token).catch((error) => {throw error});
}

export async function sendUserData(token, data){
  return await sendData(USERS_URL, token, data).catch((error) => {throw error});
}

//Projects

export async function getProjectsMe(token){
  return await getData(PROJECT_ME_URL, token).catch((error) => {throw error});
}

export async function getProjectsID(token, id){
  return await getData(PROJECT_ID_URL + id, token).catch((error) => {throw error});
}

export async function sendNewProject(token, data){
  console.log(data.multimedia)
  return await sendData('https://seedyfiuba-api-gateway.herokuapp.com/projects', token, data).catch((error) => {throw error});
}

export async function getSearchProject(token, query){
  const tags = query.tags.map((element) =>{return 'tags=' + element}).join('&');
  return await getData('https://seedyfiuba-api-gateway.herokuapp.com/projects/search?' + tags, token, {}).catch((error) => {throw error});
}