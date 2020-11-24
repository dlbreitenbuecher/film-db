'use strict';

/** Database setup for Film-DB  */

const { Client } = require('pg');
const { getDatabaseUri } = require('./config');

const db = new Client({
  connectionString: getDatabaseUri(),
})

db.connect();

module.exports = db;