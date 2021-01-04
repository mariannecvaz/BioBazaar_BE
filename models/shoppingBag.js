const mongoose = require('mongoose');

const shoppingBagSchema = new mongoose.Schema({
    id_user: Number,
    id_product: Number, 
    name:String,
    price:Number,
    image:String,
    
})

const shoppingBag = mongoose.model('shoppingBag', shoppingBagSchema)

module.exports = shoppingBag;