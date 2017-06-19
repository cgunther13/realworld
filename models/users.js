const pg = require('pg');

const scrypt = require('scrypt');
var scryptParameters = scrypt.paramsSync(0.1);

// Connect to the postgres database
const connString = process.env.DATABASE_URL || 'postgres://localhost/realworld';
const client = new pg.Client(connString);
client.connect((err) => {
  if (err) { return; }
});

function hashPassword(plaintextPassword, callback){
  return scrypt.kdfSync(plaintextPassword, scryptParameters);
}

function insertUser(first_name, last_name, age, city, move_in_date, company,
  num_bedrooms, num_baths, neighborhoods, min_rent, max_rent, num_roommates,
  adjectives, myers_briggs, r_adjectives, email, phone, hash) {
  client.query('INSERT INTO USERS(first_name, last_name, age, city, '
    + 'move_in_date, company, num_bedrooms, num_baths, neighborhoods, '
    + 'min_rent, max_rent, num_roommates, adjectives, myers_briggs, '
    + 'r_adjectives, email, phone, password) VALUES($1, $2, $3, $4, $5, $6, $7, '
    + '$8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)', [first_name,
      last_name, age, city, move_in_date, company, num_bedrooms, num_baths,
      neighborhoods, min_rent, max_rent, num_roommates, adjectives,
      myers_briggs, r_adjectives, email, phone, hash]);
}

module.exports = {
  hashPassword: hashPassword,
  insertUser: insertUser
};
