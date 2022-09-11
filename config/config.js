
const dotenv = require('dotenv');
dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

module.exports = {
  [process.env.NODE_ENV || 'development']: {
    username: DB_USERNAME,
    password: DB_PASSWORD ,
    database: DB_DATABASE ,
    host: DB_HOST ,
    dialect: 'mysql',
    logging: false, 
  },
};