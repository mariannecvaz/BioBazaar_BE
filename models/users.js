const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username:String,
    phone:String,
    name:String,
    coins:Number,
    adress:String,
    zipCode:String,
    country:String,
    city:String,
    nif:String,
    companyName: String

})

const user = mongoose.model('users', userSchema)

module.exports = user 