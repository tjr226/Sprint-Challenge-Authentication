const knex = require('knex');
const knexConfig = require('../knexfile.js');

// const environment = process.env.DB_ENV || 'development';
// module.exports = knex(config[environment])

module.exports = knex(knexConfig.development);
