/**
 * @typedef Order
 * @property {String} id_user.require
 * @property {String} name.require
 * @property {String} adress.require
 * @property {String} zipCode.require
 * @property {String} contact.require
 * @property {String} email.require
 * @property {String} city.require
 * @property {String} nif.require
 * @property {String} companyName.require
 * @property {Array} products.require
 * @property {String} total.require
 * @property {String} payment.require
  */

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  
    name: String,
    adress: String,
    zipCode: String,
    contact: String,
    email: String,
    city: String,
    nif:String,
    companyName: String,
    products: Array,
    total: String,
    payment:String
})

const order = mongoose.model('orders', orderSchema)

module.exports = order;
