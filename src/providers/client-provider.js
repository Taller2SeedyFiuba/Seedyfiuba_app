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
  }).then((resp) => resp.json()).then((response) => {
    if(response.ok || response.status == 'success'){
      return response.data;
    }else{
      throw "Network error";
    }
  });
};

export function getData(token){
  return fetch(AUTH_URL, {
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