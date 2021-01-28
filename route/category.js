const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/products.js')

/**
 * @route GET /categoria
 * @group Categoria
 * @returns {object} 200 - An array of all categories info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/categoria', (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getAllCategories(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

/**
 * @route GET /subcategorias/{name}
 * @group Categoria
 * @param {String} name.path - Nomes das subcategorias
 * @returns {object} 200 - Array de todas as subcategorias de uma categoria
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/subcategorias/:name',[param('name').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getSubCategoryByCategory(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

module.exports = router