const express = require('express');
const tasksRouter = express.Router();
const { checkSchema } = require('express-validator');

const tasksCtrl = require('../controllers/tasks.controller');
const isAuthorized = require('./auth/isAuthorized');
const checkValidationErr = require('../helpers/validation/checkValidationErr');

// Import validation schemas
const validatePostSchema = require('../helpers/validation/tasks-post-valSchema');
const validateIdSchema = require('../helpers/validation/tasks-id-valSchema');
const validateUpdateSchema = require('../helpers/validation/tasks-update-valSchema');

tasksRouter
  .get('/', isAuthorized, (req, res) => res.render('tasks'))
  .get('/all', isAuthorized, tasksCtrl.getTasks)
  .get('/:taskId', isAuthorized,checkSchema(validateIdSchema), checkValidationErr, tasksCtrl.getTask)
  .post('/', isAuthorized, checkSchema(validatePostSchema), checkValidationErr, tasksCtrl.postTask)
  .put('/:taskId', isAuthorized, checkSchema(validateUpdateSchema), checkValidationErr, tasksCtrl.updateTask)
  .delete('/:taskId', isAuthorized, checkSchema(validateIdSchema), checkValidationErr,  tasksCtrl.deleteTask);

module.exports = tasksRouter;
