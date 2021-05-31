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
  const response = fetch(AUTH_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
      }
  }).catch((error) => {
    throw error;
  }).then((resp) => resp.json())
  ;
  console.log(response);
  return response;
};