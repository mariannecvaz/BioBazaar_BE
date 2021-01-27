/**
 * @typedef User
 * @property {String} email.require
 * @property {String} password.require
 * @property {String} phone.require
 * @property {String} name.require
 * @property {Number} coins.require
 * @property {String} adress.require
 * @property {String} zipCode.require
 * @property {String} country.require
 * @property {String} city.require
 * @property {String} nif.require
 * @property {String} companyName.require
 */

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
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