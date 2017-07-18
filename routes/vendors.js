//As always, require EXPRESS!
const express = require('express');
//Now require the MODEL to be able to send and receive database data via our routes 
const Vendor = require('../models/vendor');
//Finally, iniate and require EXPRESS' Router to make things happen!
const router  = express.Router();

//GET INDEX
router.get("/", (req, res, next) => { 

    Vendor.find({}, (err, theVendorsRetrieved) => {
    if(err){
        console.log(err);
    }
    res.render("vendors/index", { theVendorsRetrieved })//PASS tobeRendered AS AN OBJECT! );
    })
});


//CREATE NEW FORM
router.get("/:id/", (req, res, next) => {
    const vendorId = req.params.id;
        Vendor.findById(vendorId, (err, vendorReturned) => {
    if(err){
        return next(err);
    }
    res.render("vendors/profile", {vendorReturned});
    }); 
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
/*
//POST NEW DATA
router.post("/new", (req, res, next) => { 
    const dishInfo = {
    dishName : req.body.dishName,
    dishQuantity : req.body.dishQuantity,
    dishPrice : req.body.dishPrice,
}

    const newDish = new Dish(dishInfo);
        
    newDish.save((err) => {
        if(err){
            return next(err);
        }
        res.redirect("/");
        })
});


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