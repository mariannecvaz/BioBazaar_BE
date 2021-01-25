const express = require('express')
const {validationResult, body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/favorites.js')


//Vai buscar a função aos controllers para adicionar um determinado produto aos favoritos
router.post('/:id_user/:id_product', [ param('id_user').notEmpty().escape(), param('id_product').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.addFavorites(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

//Vai buscar a função aos controllers que lista todos os produtos adicionados aos favoritos de um determinado utilizador
router.get('/:id_user', [param('id_user').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getFavoritesByUser(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

//Vai buscar a função aos controllers que elimina um determinado produto dos favoritos
router.delete('/:id_user/:id_product', [param('id_user').notEmpty().escape(),param('id_product').notEmpty().escape()], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        controller.deleteFav(req, res);
    } else {
        res.status(404).json({
            errors: error.array()
        })
    }
})

module.exports = router