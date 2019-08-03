const express = require('express');
const loginRouter = express.Router();
const { checkSchema } = require('express-validator');

const loginCtrl = require('../../controllers/login.controller');
const validatePostSchema = require('../../helpers/validation/login-post-valSchema'); // Import validation schema
const checkValidationErr = require('../../helpers/validation/checkValidationErr');
const authUser = require('./authUser');

loginRouter
  .get('/', (req, res) => res.render('login'))
  .post('/', checkSchema(validatePostSchema), checkValidationErr, authUser, loginCtrl.notifyClient);

module.exports = loginRouter;
