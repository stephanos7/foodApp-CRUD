const express            = require("express");
const customerAuthRoutes = express.Router();
const Customer           = require("../models/customer");
// Bcrypt
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;


//GET SIGNUP FORM
customerAuthRoutes.get("/customer-signup", (req, res, next) => {
  res.render("customer-signup");
});

//POST SIGNUP INFO
customerAuthRoutes.post("/customer-signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

//VALIDATE THAT REQUIRED INFO IS PROVIDED
  if (username === "" || password === "") {
    res.render("customer-signup", {
      errorMessage: "You need to provide a username and a password to sign up!:)"
    });
    return;
  }

//CHECK IF THE USERNAME ALREADY EXISTS
  Customer.findOne({ "username": username }, "username", (err, customer) => {
    if (customer !== null) {
      res.render("customer-signup", {
        errorMessage: "The username already exists!!"
      });
      return;
    }

//ENCRYPT THE PASSWORD USING BCRYPT
    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newCustomer = Customer({
      username,
      password: hashPass
    });

//SAVE CUSTOMER IN THE DB
    newCustomer.save((err) => {
      //handle possible errors
      if (err) {
        res.render("customer-signup", {
          errorMessage: "Something went wrong when signing up..."
        });
      } else {
        res.redirect("/customer-login");
      }
    });
  });
});

//TIME TO LOGIN!
//RENDER LOGIN FORM
customerAuthRoutes.get("/customer-login", (req, res, next) => {
  res.render("customer-login");
});

//POST LOGIN INFO
customerAuthRoutes.post("/customer-login", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

//VALIDATE THAT REQUIRED INFO IS PROVIDED
  if (username === "" || password === "") {
    res.render("customer-login", {
      errorMessage: "You need to provide a valid username and password to log in!:)"
    });
    return;
  }

//CHECK WHTHER USERNAME EXISTS IN DB
  Customer.findOne({ "username": username },
    "_id username password following",
    (err, customer) => {
      if (err || !customer) {
        res.render("customer-login", {
          errorMessage: "The username doesn't exist!!"
        });
        return;
      } else {
        if (bcrypt.compareSync(password, customer.password)) {
          req.session.currentCustomer = customer;
          console.log(req.session.currentCustomer);
          return res.redirect("customers/search");
          // logged in ADD THE VENDORS PRIVATE DASHBOARD!==============================<
        } else {
          res.render("customer-login", {
            errorMessage: "Incorrect password"
          });
        }
      }
  });
});

//LOGOUT
customerAuthRoutes.get("/customer-logout", (req, res, next) => {
  if (!req.session.currentCustomer) { res.redirect("/"); return; }

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/customer-login");
    }
  });
});

module.exports = customerAuthRoutes;