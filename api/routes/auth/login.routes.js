const express = require('express');

const loginRouter = express.Router();
const { checkSchema } = require('express-validator');

const loginCtrl = require('../../controllers/login.controller');
const checkValidationErr = require('../../lib/validation/checkErrors');
const authUser = require('./authUser');

const postSchema = require('../../lib/validation/login-post-schema'); // Import validation schema

loginRouter
  .get('/', (req, res) => res.render('login'))
  .post('/', checkSchema(postSchema), checkValidationErr, authUser, loginCtrl.notifyClient);

module.exports = loginRouter;
