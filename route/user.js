const express= require('express')
const { validationResult , body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/user.js')

/**
 * @route POST /register
 * @group Utilizadores
 * @param {object} object.body info para registar user
 * @returns {object} 200 - mensagem de sucesso
 * @returns {Error} 400 - Unexpected error
 */
router.post('/register', [
    body('email').notEmpty().escape(),
    body('password').notEmpty().escape(),
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

/**
 * @route POST /auth/google
 * @group Utilizadores
 * @param {object} object.body info para loggar user
 * @returns {object} 200 - token
 * @returns {Error} 400 - Unexpected error
 */
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

/**
 * @route POST /login
 * @group Utilizadores
 * @param {object} object.body info para loggar user
 * @returns {object} 200 - token
 * @returns {Error} 400 - Unexpected error
 */
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

/**
 * @route GET /user/{id}
 * @group Utilizadores
 * @param {String} id.path - id do utilizador
 * @returns {object} 200 - Array de utilizadores por ID
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/user/:id',[param('id').notEmpty().escape()], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        controller.getUserByIdM(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})

/**
 * @route PUT /user/{id}
 * @group Utilizadores
 * @param {String} id.path - id do utilizador
 * @param {object} object.body - Informação a editar
 * @returns {object} 200 - Editou a info do utilizador
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.put('/user/:id', [
    param('id').notEmpty().escape(),  //campos de preenchimento obrigatorio
    body('email').notEmpty().escape(),
    body('passwordNew').escape(),
    body('name').notEmpty().escape(),
    body('coins').escape(),
    body('adress').escape(),
    body('zipcode').escape(),
    body('country').escape(),
    body('city').escape(),
    body('nif').escape(),
    body('companyName').escape(),
    body('phone').escape()
], function(req, res){
    const erros = validationResult(req);
    if(erros.isEmpty()){
        console.log(req.body);
        controller.editUserM(req, res);
    }
    else{
        res.status(404).json({errors: erros.array()})
    }
})

/**
 * @route PUT /pontos/{id}
 * @group Utilizadores
 * @param {String} id.path - id do utilizador
 * @param {object} object.body - pontos do utilizador
 * @returns {object} 200 - Editou os pontos
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
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