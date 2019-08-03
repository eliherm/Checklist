const express = require('express');
const usersRouter = express.Router();
const { checkSchema } = require('express-validator');

const usersCtrl = require('../controllers/users.controller');

// Import validation schemas
const validatePostSchema = require('../helpers/validation/users-post-valSchema');
const validateUpdateSchema = require('../helpers/validation/users-update-valSchema');
const validateIdSchema = require('../helpers/validation/users-id-valSchema');

usersRouter
  .get('/', usersCtrl.getAllUsers)
  .get('/:userId', checkSchema(validateIdSchema), usersCtrl.getUser)
  .post('/', checkSchema(validatePostSchema), usersCtrl.postUser)
  .put('/:userId', checkSchema(validateUpdateSchema), usersCtrl.updateUser)
  .delete('/:userId', checkSchema(validateIdSchema), usersCtrl.deleteUser);

module.exports = usersRouter;
