'use strict';

const express = require('express');
const bodyParser = require('body-parser');

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
// app.use(express.static(__dirname + '/views'));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

// Parse req.body
// app.use(bodyParser.urlencoded({
//    extended: false
// }));
// app.use(bodyParser.json());

/*
/ Router
*/

// Landing Page
app.get('/', (req, res) => {
  res.send("Hello World")
  // res.render('landing.html');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
