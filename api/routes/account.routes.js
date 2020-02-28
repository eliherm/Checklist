const express = require('express');

const accountRouter = express.Router();
const isAuthorized = require('./auth/isAuthorized');

accountRouter
  .get('/', isAuthorized, (req, res) => res.render('account'))
  .get('/profile', isAuthorized, (req, res) => res.redirect(`/users/${req.user.id}`))
  .put('/profile/edit', isAuthorized, (req, res) => res.redirect(`/users/${req.user.id}`))
  .get('/security', isAuthorized, (req, res) => res.render('account-security'))
  .put('/security/password', isAuthorized, (req, res) => res.redirect(`/users/${req.user.id}/password`));

module.exports = accountRouter;
