const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/shoppingBag.js')

//Vai buscar a função aos controllers para adicionar um determinado produto ao saco de compras
router.post('/:id/:id_product', [
    param('id').notEmpty().isNumeric().escape(), 
    param('id_product').notEmpty().isNumeric().escape()
], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.addShoppingBag(req, res)
    } else {
        res.status(404).json(error.array())
    }
})

//Vai buscar a função aos controllers que lista todos os produtos adicionados no saco de compras de um determinado utilizador
router.get('/:id', [param('id').notEmpty().isNumeric().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getShoppingBagByUser(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

//Vai buscar a função aos controllers que elimina um determinado produto do saco das compras
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