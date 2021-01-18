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