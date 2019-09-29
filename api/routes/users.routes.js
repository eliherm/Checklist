const express = require('express');
const usersRouter = express.Router();
const { checkSchema } = require('express-validator');

const usersCtrl = require('../controllers/users.controller');
const checkValidationErr = require('../lib/validation/checkErrors');

// Import validation schemas
const idSchema = require('../lib/validation/users-id-schema');
const postSchema = require('../lib/validation/users-post-schema');
const updateSchema = require('../lib/validation/users-update-schema');
const passwordSchema = require('../lib/validation/users-password-schema');

usersRouter
  .get('/', usersCtrl.getAllUsers)
  .get('/:userId', checkSchema(idSchema), checkValidationErr, usersCtrl.getUser)
  .post('/', checkSchema(postSchema), checkValidationErr, usersCtrl.postUser)
  .put('/:userId', checkSchema(updateSchema), checkValidationErr, usersCtrl.updateUser)
  .put('/:userId/password', checkSchema(passwordSchema), checkValidationErr, usersCtrl.updatePassword)
  .delete('/:userId', checkSchema(idSchema), checkValidationErr, usersCtrl.deleteUser);

module.exports = usersRouter;
