const express = require('express');
const usersRouter = express.Router();
const { checkSchema } = require('express-validator');

const usersCtrl = require('../controllers/users.controller');
const checkValidationErr = require('../helpers/validation/checkValidationErr');

// Import validation schemas
const validatePostSchema = require('../helpers/validation/users-post-valSchema');
const validateUpdateSchema = require('../helpers/validation/users-update-valSchema');
const validateIdSchema = require('../helpers/validation/users-id-valSchema');

usersRouter
  .get('/', usersCtrl.getAllUsers)
  .get('/:userId', checkSchema(validateIdSchema), checkValidationErr, usersCtrl.getUser)
  .post('/', checkSchema(validatePostSchema), checkValidationErr, usersCtrl.postUser)
  .put('/:userId', checkSchema(validateUpdateSchema), checkValidationErr, usersCtrl.updateUser)
  .delete('/:userId', checkSchema(validateIdSchema), checkValidationErr, usersCtrl.deleteUser);

module.exports = usersRouter;
