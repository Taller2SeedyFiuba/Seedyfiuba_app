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
  return await sendData(USERS_URL, token, data).catch((error) => {throw error});
}

//Projects

export async function getProjectsMe(token){
  return await getData(PROJECT_ME_URL, token).catch((error) => {throw error});
}

export async function getProjectsID(token, id){
  return {
  "id": 5,
  "ownerid": "05yseyhiEWPNvkYYbdHL77dHKWi1",
  "title": "10000 Arboles para Chaco",
  "description": "Este proyecto busca fondos para crear una obra de arte en Chaco",
  "type": "art",
  "stage": "funding",
  "creationdate": "2021-03-14",
  "finishdate": "2023-03-14",
  "sponsorshipagreement": "Con su aporte de $5000 tendra derecho a que su nombre sea estampado en una placa junto a la obra",
  "seeragreement": "Debera comprometerse a realizar viajes periodicos a Chaco",
  "location": {
    "lat": 120,
    "lng": 40
  },
  "tags": [
    "ArbolesParaChaco",
    "ChacoVerde",
    "ChacoVive"
  ],
  "multimedia": [
    "https://www.eldiplo.org/wp-content/uploads/2020/06/chaco.png",
    "https://www.economiasolidaria.com.ar/wp-content/uploads/2019/02/ChacoWeb.jpg",
    "https://esp.habitants.org/var/ezwebin_site/storage/images/media/images/jornada_de_solidaridad_contra_desalojos_resistencia_chaco_argentina/4319220-1-ita-IT/jornada_de_solidaridad_contra_desalojos_resistencia_chaco_argentina.jpg"
  ]
};
  //await getData(PROJECT_ID_URL + id, token).catch((error) => {throw error});
}

export async function sendNewProject(token, data){
  return await sendData('https://seedyfiuba-api-gateway.herokuapp.com/projects', token, data).catch((error) => {throw error});
}
