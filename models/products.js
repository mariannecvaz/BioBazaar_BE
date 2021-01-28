/**
 * @typedef Products
 * @property {String} name.require
 * @property {String} img.require
 * @property {String} price.require
 * @property {String} id_product.require
 * @property {String} category.require
 * @property {String} subCategory.require
 * @property {String} description.require
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name:String,
   img:String,
   price:String,
   id_product: String,
   category: String,
   subCategory: String,
   description:String
})

const products = mongoose.model('products', productSchema)

module.exports = products;
