'use strict';

require('dotenv').config();

const API_SECRET_KEY = process.env.API_SECRET_KEY;

const PORT = +process.env.PORT || 3001

/**Determines whether to use the dev, test, or production database*/
function getDatabaseUri() {
  return (process.env.NODE_ENV === 'test')
    ? 'film_db_test'
    : process.env.DATABASE_URL || 'film_db';
}

module.exports = {
  API_SECRET_KEY,
  PORT,
  getDatabaseUri,
}