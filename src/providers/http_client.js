const gateway_url = 'https://seedyfiuba-back-users.herokuapp.com/api';

export function sendData(token, data){
  return fetch(gateway_url, {
  	method: 'POST',
  	body: JSON.stringify(data),
  	headers: {'Authorization': `Bearer ${token}`}
  });
};

export function getData(token){
  return fetch(gateway_url, {
  	method: 'GET',
  	headers: {'Authorization': `Bearer ${token}`}
  });
};