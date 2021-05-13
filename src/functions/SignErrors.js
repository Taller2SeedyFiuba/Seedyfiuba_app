import moment from 'moment';

function stringContainsOnlyLetters(string){
	var letters = /^[A-Za-z]+$/;
	return (string.match(letters));
}

function yearIsValid(birthDate) {
  let dates = birthDate.split('-')
  let year = parseInt(dates[0])
  return (year >= 1900) && (year <= 2020)
}

function showInvalidBirthDate(birthDate){
	return (birthDate.length >= 8) && ((!moment(birthDate, 'YYYY-MM-DD').isValid()) || (!yearIsValid(birthDate)));
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