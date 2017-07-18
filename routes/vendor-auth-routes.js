const express            = require("express");
const vendorAuthRoutes   = express.Router();
const passport           = require("passport");
const Vendor             = require("../models/vendor");
// Bcrypt
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;


//GET SIGNUP FORM
vendorAuthRoutes.get("/vendor-signup", (req, res, next) => {
  res.render("vendor-signup");
});

//POST SIGNUP INFO
vendorAuthRoutes.post("/vendor-signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

//CHECK IF PASS & USERNAME ARE PROVIDED
  if (username === "" || password === "") {
    res.render("vendor-signup", { message: "You need to provide a username and password!:)" });
    return;
  }

//CHECK IF USERNAME ALREADY EXISTS
  Vendor.findOne({ username }, "username", (err, vendor) => {
    if (vendor !== null) {
      res.render("vendor-signup", { message: "Username taken" });
      return;
    }

//ENCRYPT PASSWORD
    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newVendor = Vendor({
      username: username,
      password: hashPass
    });

//SAVE USER
    newVendor.save((err) => {
      if (err) {
        res.render("vendor-signup", { message: "Something went wrong!!!" });
      } else {
        res.redirect("/");
      }
    });
  });
});

//VENDOR LOGIN
vendorAuthRoutes.get("/vendor-login", (req, res, next) => {
  res.render("vendor-login");
});

vendorAuthRoutes.post("/vendor-login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/vendor-login",
  failureFlash: true,
  passReqToCallback: true
}));


module.exports = vendorAuthRoutes;