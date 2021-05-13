
function stringContainsOnlyLetters(string){
	var letters = /^[A-Za-z]+$/;
	return (string.match(letters));
}

function isValidDate(birthDate) {
  let dates = birthDate.split('-')
  let year = parseInt(dates[0])
  let month = parseInt(dates[1])
  let day = parseInt(dates[2])
  return new Date(year <= 2020 && year >= 1900) && (month <= 12 && month >= 1) && (day <= 31 && day >= 1)
}

function showInvalidBirthDate(birthDate){
	return (birthDate.length >= 8) && (!isValidDate(birthDate)) && (!Date.parse(birthDate));
};

function showInvalidName (name) {
  return (name != '') && (!stringContainsOnlyLetters(name));
};


function showInvalidEmail (email) {
  return (email != '') && (!email.includes('@'));
};

function showInvalidPassword (password) {
  return (password != '') && (password.length < 6);
};

function showInvalidConfirmPassword (password, passwordConf) {
  return (passwordConf.length >= password.length) && (password != passwordConf);
};

function showRegisterError (errorInfo) {
  return errorInfo != '';
};

export { showInvalidEmail, showInvalidPassword, showInvalidConfirmPassword, showRegisterError, showInvalidName, showInvalidBirthDate}