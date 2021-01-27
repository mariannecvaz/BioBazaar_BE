/**
 * @typedef Favorites
 * @property {String} id_user.require
 * @property {Number} id_product.require
 * @property {String} name.require
 * @property {Number} price.require
 * @property {String} image.require
 */

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    id_user: String,
    id_product: Number, 
    name:String,
    price:Number,
    image:String,
    
})

const favorites = mongoose.model('favorites', favoriteSchema)

module.exports = favorites;