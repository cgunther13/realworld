var usersModels = require('../models/users.js');

function insertUser(req, res) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Validate the inputs
  if (req.body.first_name == "" || req.body.first_name.length > 50) {
    res.render('sign-up', { error: "First name must be between 1 and 50 characters" });
    return;
  } else if (req.body.last_name == "" || req.body.last_name.length > 50) {
    res.render('sign-up', { error: "Last name must be between 1 and 50 characters" });
    return;
  } else if (req.body.email == "" || req.body.email.length > 50) {
    res.render('sign-up', { error: "Email must be between 1 and 50 characters" });
    return;
  } else if (!re.test(req.body.email)) {
    res.render('sign-up', { error: "Please enter a valid email" });
    return;
  }

  // Hash the password
  hash = usersModels.hashPassword(req.body.password);

  // Set empty string INTs and DATEs to null
  if (req.body.age == "") {
    req.body.age = null;
  }
  if (req.body.num_bedrooms == "") {
    req.body.num_bedrooms = null;
  }
  if (req.body.num_baths == "") {
    req.body.num_baths = null;
  }
  if (req.body.min_rent == "") {
    req.body.min_rent = null;
  }
  if (req.body.max_rent == "") {
    req.body.max_rent = null;
  }
  if (req.body.num_roommates == "") {
    req.body.num_roommates = null;
  }

  if (req.body.move_in_date == "") {
    req.body.move_in_date = null;
  }

  // Insert the user into the LANDING database
  usersModels.insertUser(req.body.first_name, req.body.last_name, req.body.age,
    req.body.city, req.body.move_in_date, req.body.company,
    req.body.num_bedrooms, req.body.num_baths, req.body.neighborhoods,
    req.body.min_rent, req.body.max_rent, req.body.num_roommates,
    req.body.adjectives, req.body.myers_briggs, req.body.r_adjectives,
    req.body.email, req.body.phone, hash);

  // Submit GA Hit
  var form = document.getElementById('madlib');
  // Adds a listener for the "submit" event.
  form.addEventListener('submit', function(event) {
    // Prevents the browser from submitting the form and thus unloading the
    // current page.
    event.preventDefault();
    // Creates a timeout to call `submitForm` after one second.
    setTimeout(submitForm, 1000);
    // Keeps track of whether or not the form has been submitted.
    // Prevents form from being submitted 2x if `hitCallback` fires normally.
    var formSubmitted = false;
    function submitForm() {
      if (!formSubmitted) {
        formSubmitted = true;
        form.submit();
      }
    }
    // Sends the event to Google Analytics and then resubmits the form.
    ga('send', 'event', 'madlib', 'submit', {
      console.log("Hello");
      console.log(form);
      hitCallback: submitForm
    });
  });

  res.redirect('/thanks');
}

module.exports = {
  insertUser: insertUser
}
