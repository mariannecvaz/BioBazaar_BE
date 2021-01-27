/**
 * @typedef Category
 * @property {String} name.require
 * @property {String} img.require
 * @property {Array} subCategories.require
 */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    img: String,
    subCategories: Array

})

const category = mongoose.model('categories', categorySchema)

module.exports = category;