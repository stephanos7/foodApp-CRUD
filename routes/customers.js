const express   = require('express');
const Customer  = require('../models/customer');
const router    = express.Router();

// Bcrypt
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;


//MIDDLEWARE TO ENSURE ALL FOLLOWING ROUTES ARE ACCESSIBLE ONLY BY SINGNED IN USERS
router.use((req, res, next) => {
  if (req.session.currentCustomer) { next(); }
  else { res.redirect("/customer-login"); }
});


//GET SEARCH
router.get("/search", (req, res, next) => {
  res.render("customers/search",
    { username: req.session.currentCustomer.username }
  );
});

module.exports = router;