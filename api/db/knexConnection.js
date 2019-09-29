const knexConfig = require('../../knexfile')[process.env.NODE_ENV || 'development'];

module.exports = require('knex')(knexConfig);
