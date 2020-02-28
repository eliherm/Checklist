const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const uuid = require('uuid/v4');
const path = require('path');
const passport = require('./passport-config');
const redisConfig = require('./config')[process.env.NODE_ENV || 'development'].redis;

const router = require('./routes/index.routes');

const app = express();
app.use(helmet()); // Provides security features for express
app.use(compression());

const redisClient = redis.createClient(redisConfig);
redisClient.on('error', console.error);

// Configure session
app.use(session({
  name: 'checklist.sid',
  secret: process.env.SESSION_SECRET,
  genid: () => uuid(),
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000
  }
}));

// Check if the redis connection is active
app.use((req, res, next) => {
  if (!req.session) {
    return next({ status: 500 });
  }
  return next();
});

// Enable support for parsing request payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Error Handler
app.use((err, req, res, next) => {
  if (err.showMsg) {
    res.status(err.status || 500).json({ error: err.clientMessage });
  } else {
    res.status(err.status || 500).json({ error: 'An error occurred' });
  }

  // Forward internal errors
  if (err.status === 500 || !err.status) {
    next(err);
  }
});

module.exports = app;
