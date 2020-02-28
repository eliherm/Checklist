const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisConfig = require('./config')[process.env.NODE_ENV || 'development'].redis;
const passport = require('./passport-config');
const uuid = require('uuid/v4');
const path = require('path');

const router = require('./routes/index.routes');

const app = express();
app.use(helmet()); // Provides security features for express
app.use(compression());

// Configure session
app.use(session({
  name: 'checklist.sid',
  secret: process.env.SESSION_SECRET,
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
app.use(express.urlencoded({extended: false}));

// Enable ejs templating
app.set('views', './views');
app.set('view engine', 'ejs');

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files to client
app.use(express.static(path.join(__dirname, '..', 'client/dist')));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

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
