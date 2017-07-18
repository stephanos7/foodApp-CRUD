const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dish = require("./dish");

const vendorSchema = new Schema ({
    email    : String,
    password : String,
    name     : String,
    postcode : String, 
    cuisine  : String,
    capacity : Number,
    menu   : [Dish.schema]
   
}, {
    timeStamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;