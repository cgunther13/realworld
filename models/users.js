const pg = require('pg');

// Connect to the postgres database
const connString = process.env.DATABASE_URL || 'postgres://localhost/realworld';
const client = new pg.Client(connString);
client.connect((err) => {
  if (err) { return; }
});

function landingUser(name, email){
  client.query('INSERT INTO LANDING(NAME, EMAIL) VALUES($1, $2)', [name, email]);
}

module.exports = {
  landingUser: landingUser
};
