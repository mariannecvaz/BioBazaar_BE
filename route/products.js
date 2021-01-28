const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/products.js')

/**
 * @route GET /products
 * @group Produtos
 * @returns {object} 200 - Array de todos os produtos
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get( '/', ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getAllProducts( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

/**
 * @route GET /products/{id}
 * @group Produtos
 * @returns {object} 200 - Array de todos os produtos pelo ID
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get( '/:id',[param('id').notEmpty().isNumeric().escape()], ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getProductById( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

/**
 * @route GET /subcategoria/{:subcategory}
 * @group Produtos
 * @returns {object} 200 - Array de todos os produtos de uma subcategoria
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/subcategoria/:subCategory',[param('subCategory').notEmpty().escape()], ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getProductBySubCategory( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );



module.exports = router