import {USERS_URL, AUTH_URL} from '@env';

export function sendData(token, data){
  return fetch(USERS_URL, {
  	method: 'POST',
  	//mode : 'no-cors',
  	body: JSON.stringify(data),
  	headers: {
      'Authorization': 'Bearer ' + token,
  		'Content-Type': 'application/json'
  	}
  });
};

export function getData(token){
  return true;
  /*
  return fetch(AUTH_URL, {
  	method: 'GET',
  	headers: {
      'Authorization': 'Bearer ' + token
      }
  }).then((resp) => resp.json());*/
};