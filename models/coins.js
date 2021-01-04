const mongoose = require('mongoose');

const coinsSchema = new mongoose.Schema({
    id_user: Number,
    coins: Number
    
})

const coins = mongoose.model('coins', coinsSchema)

module.exports = coins;