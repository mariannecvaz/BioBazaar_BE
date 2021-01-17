const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/products.js')

router.get('/categoria', (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getAllCategories(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

router.get('/subcategorias/:name',[param('name').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getSubCategoryByCategory(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

module.exports = router