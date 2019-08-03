module.exports = {
  development: {
    client: 'mysql2',
    version: '8.0.16',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '123',
      database: process.env.DB_NAME || 'checklist'
    },
    migrations: {
      directory: './api/db/migrations',
      tableName: 'knex_migrations'
    }
  },
  production: {}
};
