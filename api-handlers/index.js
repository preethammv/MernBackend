const signUp = require("./auth/signUp");
const logIn = require("./auth/logIn");
const resetPassword = require('./auth/resetPassword')
const deleteAccount = require('./auth/deleteAccount')

module.exports = {
  "signUp": signUp,
  "logIn": logIn,
  "resetPassword" : resetPassword,
  "deleteAccount" :  deleteAccount
};
