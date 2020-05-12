require('dotenv').config(); // Sets up environment vars

module.exports = {
  development: {
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    port: process.env.PORT
  },
  production: {}
};
