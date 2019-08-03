const express = require('express');
const router = express.Router();

const usersRouter = require('./users.routes');
const tasksRouter = require('./tasks.routes');
const loginRouter = require('./auth/login.routes');
const logoutHandler = require('./auth/logout.routes');

const isAuthorized = require('./auth/isAuthorized');

router
  .get('/', (req, res) => res.render('index'))
  .get('/register', (req, res) => res.render('register'))
  .get('/account', isAuthorized, (req, res) => res.redirect(`/users/${req.user.id}`))
  .use('/users', usersRouter)
  .use('/tasks', tasksRouter)
  .use('/login', loginRouter)
  .get('/logout', logoutHandler);

module.exports = router;
