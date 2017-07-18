const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema ({
    dishName    : String,
    dishQuantity : Number,
    dishPrice     : Number,   
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;