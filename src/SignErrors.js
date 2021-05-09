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

export { showInvalidEmail, showInvalidPassword, showInvalidConfirmPassword, showRegisterError }