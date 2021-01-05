const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username:String,
    coins:Number,
    adress:String,
    zipCode:String,
    country:String,
    city:String
})

const user = mongoose.model('users', userSchema)

module.exports = user 