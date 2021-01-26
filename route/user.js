const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/user.js')

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

router.post('/auth/google',
[body('token').notEmpty().escape()],
 function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        controller.googleAuth(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})
router.post('/login', [
    body('email').notEmpty().escape(),
    body('password').notEmpty().escape()], function(req, res){
        const erros = validationResult(req);
        if(erros.isEmpty()){
            controller.loginM(req, res)
        }
        else{
            res.status(404).json({errors: erros.array()})
        }
    
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
    body('passwordNew').notEmpty().escape(),
    body('name').notEmpty().escape(),
    body('coins').notEmpty().escape(),
    body('adress').notEmpty().escape(),
    body('zipcode').notEmpty().escape(),
    body('country').notEmpty().escape(),
    body('city').notEmpty().escape(),
    body('nif').notEmpty().escape(),
    body('companyName').notEmpty().escape(),
    body('phone').notEmpty().escape()
], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        controller.editUserM(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})
router.put('/pontos/:id', [
    param('id').notEmpty().escape(),
    body('coins').notEmpty().isNumeric().escape()
], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()) {
        controller.editCoins(req, res);
    }
    else{
        res.status(404).json({errors: erros.array})
    }
})
module.exports = router