const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/foodModelsDB");
const Vendor  = require("../models/vendor");
const Dish = require("../models/vendor");

const initialVendorData = [{
        email : "maria@gmail.com",
        password : "lopez",
            name : "Maria Lopez",
        postcode : "08002", 
        cuisine : "Italian",
        capacity : 5,
              menu: [
    {
        dishName    : "Pasta",
        dishQuantity : 20,
        dishPrice     : 9,   
    }
                    ] 
},
    {
        email : "alessandro@gmail.com",
        password : "cerri",
            name : "Alessandro Cerri",
        postcode : "08002", 
        cuisine : "Italian",
        capacity : 9,
        menu : [
    {
        dishName    : "Pizza",
        dishQuantity : 10,
        dishPrice     : 5,  
    }
                ]
    }
    ];

Vendor.create(initialVendorData, (err, docs) => {
    if(err){
        throw err;
    }
    docs.forEach((element) => {
        console.log(element);
    })
    mongoose.connection.close();
})
