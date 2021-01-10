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
router.get( '/users', ( req, res ) => {
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


//Mongoose
router.post('/register', [
    body('email').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('username').notEmpty().escape(),
    body('name').notEmpty().escape(),
], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        controller.registerM(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})

router.post('/login', [
    body('email').notEmpty().escape(),
    body('password').notEmpty().escape()], function(req, res){
    controller.loginM(req, res)
})
router.get('/user/:id',[param('id').notEmpty().escape()], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        controller.getUserByIdM(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})
router.put('/user/:id', [
    param('id').notEmpty().escape(),  //campos de preenchimento obrigatorio
    body('email').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('username').notEmpty().escape(),
    body('coins').notEmpty().escape(),
    body('adress').notEmpty().escape(),
    body('zipcode').notEmpty().escape(),
    body('country').notEmpty().escape(),
    body('city').notEmpty().escape(),
], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        controller.editUserM(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})
module.exports = router