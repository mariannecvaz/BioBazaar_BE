const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/user.js')

//Vai buscar a função aos controllers para criar um utilizador
router.post( '/',[body('email').notEmpty().escape()], ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.createUser( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

// Vai buscar a função aos controllers para criar um utilizador
router.post( '/wp-json/jwt-auth/v1/token', ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.login( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

//Vai buscar a função aos controllers para mostrar todos os utilizadores
router.get( '/', ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getAllUsers( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );            

router.get( '/:id',[body('id').notEmpty().escape()], ( req, res ) => {
    const error = validationResult(req)
    if(error.isEmpty()){
        controller.getUserbyId( req, res )
    }
   else{
    res.status(404).json(error.array())
   }
} );

//VER CAMPOS DE PREENCHIMENTO
router.put('/:id', [
    param('id').notEmpty().escape().isNumeric(),
], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        controller.editUser(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})
module.exports = router