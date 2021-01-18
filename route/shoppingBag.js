const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/shoppingBag.js')

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

router.get('/:id', [param('id').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getShoppingBagByUser(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

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
