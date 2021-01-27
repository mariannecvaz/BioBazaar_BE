/**
 * @typedef ShoppingBag
 * @property {String} id_user.require
 * @property {String} id_product.require
 * @property {String} name.require
 * @property {String} price.require
 * @property {String} image.require
 * @property {Number} count.require
*/

const mongoose = require('mongoose');

const shoppingBagSchema = new mongoose.Schema({
    id_user: String,
    id_product: String, 
    name:String,
    price:Number,
    image:String,
    count: Number

})

const shoppingBag = mongoose.model('shoppingBag', shoppingBagSchema)

module.exports = shoppingBag;