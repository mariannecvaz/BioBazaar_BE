const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    id_user: Number,
    id_product: Number, 
    name:String,
    price:Number,
    image:String,
    
})

const favorites = mongoose.model('favorites', favoriteSchema)

module.exports = favorites;