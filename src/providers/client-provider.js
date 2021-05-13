const gateway_url = 'https://seedyfiuba-back-users.herokuapp.com/api';

export function sendData(token, data){
	console.log('Anduvo todo muy bien', data);
	console.log(JSON.stringify(data));
  return fetch(gateway_url, {
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
  return fetch(gateway_url, {
  	method: 'GET',
  	headers: {'Authorization': `Bearer ${token}`}
  });
};