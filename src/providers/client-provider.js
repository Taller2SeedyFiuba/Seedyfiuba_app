const users_url = 'https://seedyfiuba-api-gateway.herokuapp.com/users';
const auth_url  = 'https://seedyfiuba-api-gateway.herokuapp.com/users/me';

export function sendData(token, data){
  return fetch(users_url, {
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
  return fetch(auth_url, {
  	method: 'GET',
  	headers: {
      'Authorization': 'Bearer ' + token
      }
  }).then((resp) => resp.json());
};