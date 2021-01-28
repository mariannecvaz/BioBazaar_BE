const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/orders.js')

/**
 * @route POST /orders/{id}
 * @group Encomendas
 * @param {object} object.body Info para adicionar encomenda
 * @returns {object} 200 - Array de todas as encomendas  
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.post('/:id', [
    param('id').notEmpty().escape(), 
], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.addOrder(req, res)
    } else {
        res.status(404).json(error.array())
    }
})

/**
 * @route GET /orders/{id}
 * @group Encomendas
 * @returns {object} 200 - Array de todas as encomendas por utilizador
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/:id', [param('id').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.orderByUser(req, res)
    } else {
        res.status(404).json(error.array())
    }
});


module.exports = router