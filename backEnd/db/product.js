const mongoose = require("mongoose");

const produstSchema = mongoose.Schema({
    name:String,
    price:String,
    category:String , 
    uesrId:String , 
    company:String 
})

module.exports = mongoose.model("products" , produstSchema) ;