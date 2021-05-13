const gateway_url = '123.45.78';

export function sendData(token, data){
  return fetch(gateway_url, {
  	method: 'GET', // 'POST'
  	body: JSON.stringify(data), // data can be string or object
  	headers: {'Authorization': 'Bearer ${token}'}
  });
};

export function sendHead(token){
  return fetch(gateway_url, {
  	method: 'GET', // 'POST'
  	headers: {'Authorization': 'Bearer ${token}'}
  });
};