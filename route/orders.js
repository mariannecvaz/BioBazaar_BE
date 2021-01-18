const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/orders.js')

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


router.get('/:id', [param('id').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.orderByUser(req, res)
    } else {
        res.status(404).json(error.array())
    }
});


module.exports = router