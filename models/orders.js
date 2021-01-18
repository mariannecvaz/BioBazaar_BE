const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id_user: String,
    name: String,
    adress: String,
    zipCode: String,
    contact: String,
    email: String,
    city: String,
    products: Array,
    total: String,
})

const order = mongoose.model('orders', orderSchema)

module.exports = order;
