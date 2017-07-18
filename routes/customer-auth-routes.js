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
  const username = req.body.username;
  const password = req.body.password;

//CHECK IF PASS & USERNAME ARE PROVIDED
  if (username === "" || password === "") {
    res.render("customer-signup", { message: "You need to provide a username and password!:)" });
    return;
  }

//CHECK IF USERNAME ALREADY EXISTS
  Customer.findOne({ username }, "username", (err, vendor) => {
    if (vendor !== null) {
      res.render("customer-signup", { message: "Username taken" });
      return;
    }

//ENCRYPT PASSWORD
    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newCustomer = Customer({
      username: username,
      password: hashPass
    });

//SAVE USER
    newCustomer.save((err) => {
      if (err) {
        res.render("customer-signup", { message: "Something went wrong!!!" });
      } else {
        res.redirect("/");
      }
    });
  });
});

module.exports = customerAuthRoutes;