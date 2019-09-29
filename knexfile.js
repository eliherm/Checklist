const config = require('./api/config')[process.env.NODE_ENV || 'development'];

module.exports = {
  development: {
    client: 'mysql2',
    version: '8.0.16',
    connection: {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database
    },
    migrations: {
      directory: './api/db/migrations',
      tableName: 'knex_migrations'
    }
  },
  production: {}
};
