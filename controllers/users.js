var usersModels = require('../models/users.js');

function landingUser(req, res) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Validate the inputs
  if (req.body.name == "" || req.body.name.length > 50) {
    res.render('register', { error: "First name must be between 1 and 50 characters" });
    return;
  } else if (req.body.email == "" || req.body.email.length > 50) {
    res.render('register', { error: "Email must be between 1 and 50 characters" });
    return;
  } else if (!re.test(req.body.email)) {
    res.render('register', { error: "Please enter a valid email" });
    return;
  }

  // Insert the user into the LANDING database
  usersModels.landingUser(req.body.name, req.body.email);

  res.redirect('/');
}

module.exports = {
  landingUser: landingUser
}
