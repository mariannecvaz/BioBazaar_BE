const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name:String,
   img:String,
   price:String,
   id_product: String,
   category: String,
   subCategory: String
})

const products = mongoose.model('products', productSchema)

module.exports = products;
