const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/shoppingBag.js')

/**
 * @route POST /sacoCompras/{id}/{id_product}
 * @group SacoCompras
 * @param {String} id.path - id do utilizador
 * @param {String} id_product.path - id do produto
 * @returns {object} 200 - An array of all car info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.post('/:id/:id_product', [
    param('id').notEmpty().escape(), 
    param('id_product').notEmpty().escape()
], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.addShoppingBag(req, res)
    } else {
        res.status(404).json(error.array())
    }
})

/**
 * @route GET /sacoCompras/{id}
 * @group SacoCompras
 * @param {String} id.path - id do utilizador
 * @returns {object} 200 - Array de todos os produtos adicionados no carrinho
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/:id', [param('id').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getShoppingBagByUser(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

/**
 * @route DELETE /sacoCompras/{id}/{id_product}
 * @group SacoCompras
 * @param {String} id.path - id do utilizador
 * @param {String} id_product.path - id do produto
 * @returns {object} 200 - Eliminou o produto do carrinho
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.delete('/:id/:id_product', [
    param('id').notEmpty().escape(), param('id_product').notEmpty().escape() //campos de preenchimento obrigatorio
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        controller.deleteProduct(req, res);
    } else {
        res.status(404).json({
            errors: error.array()
        })
    }
})

module.exports = router
