// db.js
const pgp = require('pg-promise')();
const password = process.env.DBPASSWORD

const connectionOptions = {
  host: 'localhost',
  port: 5432,
  database: 'Registration',
  user: 'postgres',
  password: password,
};

let dbInstance;

function getDatabase() {
  if (!dbInstance) {
    dbInstance = pgp(connectionOptions);
  }
  return dbInstance;
}


function closeDatabase() {
  if (dbInstance) {
    dbInstance.$pool.end(); 
    dbInstance = null;
  }
}

module.exports = {
  getDatabase,
  closeDatabase,
};

