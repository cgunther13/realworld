'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const usersControllers = require('./controllers/users.js');

const app = express();

const host = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 4000;

const connString = process.env.DATABASE_URL || 'postgres://localhost/realworld';

// Store session
// app.use(session({
//   store: new pgSession({
//     pg : pg,
//     conString : connString,
//   }),
//   secret: process.env.FOO_COOKIE_SECRET || 'solitary-leaf',
//   resave: false,
//   saveUninitialized : false,
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
// }));

// Display HTML and CSS
app.use(express.static(__dirname + '/views/html5up-spectral/'));
app.set('views', 'views/html5up-spectral');
app.set('view engine', 'ejs');

// Parse req.body
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

/*
/ Router
*/

// Landing Page
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up');
});
app.post('/sign-up', usersControllers.insertUser)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
