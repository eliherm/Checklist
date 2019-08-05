const express = require('express');
const router = express.Router();

const usersRouter = require('./users.routes');
const tasksRouter = require('./tasks.routes');
const loginRouter = require('./auth/login.routes');
const accountRouter = require('./account.routes');
const logoutHandler = require('./auth/logout.routes');

router
  .get('/', (req, res) => res.render('index'))
  .get('/register', (req, res) => res.render('register'))
  .use('/users', usersRouter)
  .use('/tasks', tasksRouter)
  .use('/login', loginRouter)
  .use('/account', accountRouter)
  .get('/logout', logoutHandler);

module.exports = router;
