const express = require('express');
const tasksRouter = express.Router();
const { checkSchema } = require('express-validator');

const tasksCtrl = require('../controllers/tasks.controller');
const isAuthorized = require('./auth/isAuthorized');
const checkValidationErr = require('../lib/validation/checkErrors');

// Import validation schemas
const idSchema = require('../lib/validation/tasks-id-schema');
const postSchema = require('../lib/validation/tasks-post-schema');
const updateSchema = require('../lib/validation/tasks-update-schema');

tasksRouter
  .get('/', isAuthorized, (req, res) => res.render('tasks'))
  .get('/all', isAuthorized, tasksCtrl.getTasks)
  .get('/:taskId', isAuthorized,checkSchema(idSchema), checkValidationErr, tasksCtrl.getTask)
  .post('/', isAuthorized, checkSchema(postSchema), checkValidationErr, tasksCtrl.postTask)
  .put('/:taskId', isAuthorized, checkSchema(updateSchema), checkValidationErr, tasksCtrl.updateTask)
  .delete('/:taskId', isAuthorized, checkSchema(idSchema), checkValidationErr,  tasksCtrl.deleteTask);

module.exports = tasksRouter;
