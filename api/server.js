const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisConfig = require('./redis-config');
const passport = require('./passport-config');
const uuid = require('uuid/v4');
const path = require('path');
require('dotenv').config(); // Sets up environment variables

const router = require('./routes/index.routes');

const app = express();
app.use(helmet()); // Provides security features for express

// Configure session
app.use(session({
  name: 'checklist.sid',
  secret: 'secret',
  genid: () => {
    return uuid();
  },
  store: new RedisStore(redisConfig),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000
  }
}));

// Check if the redis connection is active
app.use((req, res, next) => {
  if (!req.session) {
    return next({ resStatus: 500, clientMessage: 'Internal server error' });
  }
  next();
});

// Enable support for parsing request payloads
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Enable ejs templating
app.set('views', './views');
app.set('view engine', 'ejs');

// Serve static files to client
app.use(express.static(path.join(__dirname, '..', 'client')));

// Implement routes
app.use(router);

// TODO: Optimize Error Hanlder
// Error Handler
app.use((err, req, res, next) => {
  if (typeof err === 'object') {
    if (err.clientMessage) {
      res.status(err.resStatus).json(err.clientMessage);
    }
    next(err);
  } else {
    next(err);
  }
});

module.exports = app;
