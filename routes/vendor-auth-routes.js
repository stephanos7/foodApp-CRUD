
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
  var email = req.body.email;
  var password = req.body.password;

//VALIDATE THAT REQUIRED INFO IS PROVIDED
  if (email === "" || password === "") {
    res.render("vendor-signup", {
      errorMessage: "You need to provide a username and a password to sign up!:)"
    });
    return;
  }

//CHECK IF THE USERNAME ALREADY EXISTS
  Vendor.findOne({ "email": email }, "email", (err, user) => {
    if (user !== null) {
      res.render("vendor-signup", {
        errorMessage: "The email account already exists!!"
      });
      return;
    }

//ENCRYPT THE PASSWORD USING BCRYPT
    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newVendor = Vendor({
      email,
      password: hashPass
    });

//SAVE VENDOR IN THE DB
    newVendor.save((err) => {
      //handle possible errors
      if (err) {
        res.render("vendor-signup", {
          errorMessage: "Something went wrong when signing up..."
        });
      } else {
        res.redirect("/vendor-login");
      }
    });
  });
});

//TIME TO LOGIN!
//RENDER LOGIN FORM
vendorAuthRoutes.get("/vendor-login", (req, res, next) => {
  res.render("vendor-login");
});

//POST LOGIN INFO
vendorAuthRoutes.post("/vendor-login", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

//VALIDATE THAT REQUIRED INFO IS PROVIDED
  if (email === "" || password === "") {
    res.render("vendor-login", {
      errorMessage: "You need to provide a valid username and password to log in!:)"
    });
    return;
  }

//CHECK WHTHER USERNAME EXISTS IN DB
  Vendor.findOne({ "email": email },
    "_id email password following",
    (err, vendor) => {
      if (err || !vendor) {
        res.render("vendor-login", {
          errorMessage: "The email doesn't exist!!"
        });
        return;
      } else {
        if (bcrypt.compareSync(password, vendor.password)) {
          req.session.currentVendor = vendor;
          console.log(req.session.currentVendor);
          return res.redirect("/vendors");
          // logged in ADD THE VENDORS PRIVATE DASHBOARD!==============================<
        } else {
          res.render("vendor-login", {
            errorMessage: "Incorrect password"
          });
        }
      }
  });
});

//LOGOUT
vendorAuthRoutes.get("/logout", (req, res, next) => {
  if (!req.session.currentVendor) { res.redirect("/"); return; }

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/vendor-login");
    }
  });
});

module.exports = vendorAuthRoutes;