
const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/products.js')

//Vai buscar a função aos controllers para mostrar todos os produtos
router.get( '/', ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getAllProducts( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

//Vai buscar a função aos controllers para mostrar todos os produtos pelo respetivo ID
router.get( '/:id',[param('id').notEmpty().isNumeric().escape()], ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getProductById( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

router.get( '/:category',[param('category').notEmpty().escape()], ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getProductByCategory( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

module.exports = router