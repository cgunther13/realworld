var usersModels = require('../models/users.js');

function insertUser(req, res) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Validate the inputs
  if (req.body.firstname == "" || req.body.firstname.length > 50) {
    res.render('sign-up', { error: "First name must be between 1 and 50 characters" });
    return;
  } else if (req.body.lastname == "" || req.body.lastname.length > 50) {
    res.render('sign-up', { error: "Last name must be between 1 and 50 characters" });
    return;
  } else if (req.body.email == "" || req.body.email.length > 50) {
    res.render('sign-up', { error: "Email must be between 1 and 50 characters" });
    return;
  } else if (!re.test(req.body.email)) {
    res.render('sign-up', { error: "Please enter a valid email" });
    return;
  }

  // Insert the user into the LANDING database
  usersModels.insertUser(req.body.first_name, req.body.last_name, req.body.age,
    req.body.city, req.body.move_in_date, req.body.company,
    req.body.num_bedrooms, req.body.num_baths, req.body.neighborhood1,
    req.body.neighborhood2, req.body.neighborhood3, req.body.min_rent,
    req.body.max_rent, req.body.num_roommates, req.body.adjective1,
    req.body.adjective2, req.body.adjective3, req.body.myers_briggs,
    req.body.r_adjective1, req.body.r_adjective2, req.body.r_adjective3,
    req.body.email, req.body.phone, req.body.password);

  res.redirect('/');
}

module.exports = {
  insertUser: insertUser
}
