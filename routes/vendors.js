const express = require('express');
const Vendor  = require('../models/vendor');
const Dish    = require("../models/dish");
const router  = express.Router();

//MIDDLEWARE TO ENSURE ALL FOLLOWING ROUTES ARE ACCESSIBLE ONLY BY SINGNED IN USERS
router.use((req, res, next) => {
  if (req.session.currentVendor) { next(); }
  else { res.redirect("/vendor-login"); }
});


//GET INDEX
router.get("/", (req, res, next) => {
  res.render("vendors/dashnoard",
    { username: req.session.currentVendor.email}
  );
});

router.get("/", (req, res, next) => { 

    Vendor.find({}, (err, theVendorsRetrieved) => {
    if(err){
        console.log(err);
    }
    res.render("vendors/index", { theVendorsRetrieved })//PASS tobeRendered AS AN OBJECT! );
    })
});

router.get("/:id/new", (req, res, next) => {
    const vendorId = req.params.id;
    Vendor.findById(vendorId, (err, vendorReturned) => {
        if(err){
            return next(err);
        }
        res.render("vendors/new", {vendorReturned});
    }); 
});


//GET THE NEW DISH FORM
router.get("/:id", (req, res, next) => {
    const vendorId = req.params.id;
        Vendor.findById(vendorId, (err, vendorReturned) => {
    if(err){
        return next(err);
    }
    //console.log(vendorReturned.menu);
    res.render("vendors/profile", {vendorReturned});
    }); 
});


//POST NEW DISH TO BE INCLUDED IN THE MENU
router.post("/vendors/vendor.id/new", (req, res, next) => { 
  let vendorId = req.params.id;
  console.log('vendor post: ', vendorId);
  res.redirect(`vendors/${vendor._id}`);

//    const newDish = new Dish({
//       dishName: req.body.dishName,
//       dishQuantity: req.body.dishQuantity,
//       dishPrice: req.body.dishPrice
//     });


//     Vendor.findByIdAndUpdate({_id: vendorId},{$push:{menu: newDish}}, (err, vendor) => {
//       if (err){
//           console.log('error -> ', err)
//           return next(err);
//       } else {
//         console.log("finding...", vendor);
//         // res.render("index");
        

//     // vendor.menu.push(newDish);

//       }
  
    // vendor.save((err) => {
    //  if(err){return next (err)} else{
    //      console.log("inside")
    //         res.redirect("/");
    //  }
    
    // });
//   });
});

/*

    const newDish = new Dish(dishInfo);
        
    newDish.save((err) => {
        if(err){
            return next(err);
        }
        res.redirect("/");
        })
});
//GET MENUS



//GO TO VENDOR PROFILE
router.get("/:id", (req, res, next) => { 
    const celebId = req.params.id;
        Celebrity.findById(celebId, (err, celeb) => {
    if(err){
        return next(err);
    }
    res.render("celebrities/profile", {celeb});
    })
});


//DELETE DISH
router.post("/:id/delete", (req, res, next) => {
    const celebId = req.params.id;

    Celebrity.findByIdAndRemove(celebId, (err) => {
        if(err){
            return next(err);
        }
        res.redirect("/celebrities");
    })
});

//EDIT DISH
router.get("/:id/edit", (req, res, next) => { 
    const celebId = req.params.id;

    Celebrity.findById(celebId, (err, celeb) => {
    if(err){
        return next(err);
    }
    res.render("celebrities/edit", {celeb});
    });
});

router.post("/:id", (req, res, next) => {
    const celebId = req.params.id;
    const updates = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };
    Celebrity.findByIdAndUpdate(celebId, updates, false, (err, celebUpdated) => {
        console.log("The id to be edited is:::: ", celebId);
        if(err){
            return next(err);
        }
        return res.redirect("/celebrities");
    });
});
*/

module.exports = router;