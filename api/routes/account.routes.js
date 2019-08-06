const express = require('express');
const accountRouter = express.Router();
// const { checkSchema } = require('express-validator');

// const tasksCtrl = require('../controllers/tasks.controller');
const isAuthorized = require('./auth/isAuthorized');
// const checkValidationErr = require('../helpers/validation/checkValidationErr');

// Import validation schemas
// const validatePostSchema = require('../helpers/validation/tasks-post-valSchema');
// const validateIdSchema = require('../helpers/validation/tasks-id-valSchema');
// const validateUpdateSchema = require('../helpers/validation/tasks-update-valSchema');

accountRouter
  .get('/', isAuthorized, (req, res) => res.render('account'))
  .get('/profile', isAuthorized, (req, res) => res.redirect(`/users/${req.user.id}`))
  .put('/profile/edit', isAuthorized, (req, res) => res.redirect(`/users/${req.user.id}`))
  .get('/security', isAuthorized, (req, res) => res.render('account-security'))
  .put('/security/password', isAuthorized, (req, res) => res.redirect(`/users/${req.user.id}/password`));

module.exports = accountRouter;
