const users_url = 'https://seedyfiuba-api-gateway.herokuapp.com/users';
const auth_url  = 'https://seedyfiuba-api-gateway.herokuapp.com/users/me';

export function sendData(token, data){
	console.log('Anduvo todo muy bien', data);
	console.log(JSON.stringify(data));
  return fetch(users_url, {
  	method: 'POST',
  	cors : 'no-cors',
  	body: JSON.stringify(data),
  	headers: {
  		'Content-Type': 'application/json',
  		'Authorization': `Bearer ${token}`
  	}
  });
};

export function getData(token){
  return fetch(auth_url, {
  	method: 'GET',
  	headers: {'Authorization': `Bearer ${token}`}
  });
};