const express = require('express')
const {validationResult, body, param} = require('express-validator')
const router = express.Router()
const controller = require('../controller/favorites.js')

/**
 * @route POST /favoritos/{id_user}/{id_product}
 * @group Favoritos
 * @param {String} id_user.path - id do utilizador
 * @param {String} id_product.path - id do produto
 * @returns {object} 200 - Array de todos os produtos nos favoritos
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.post('/:id_user/:id_product', [ param('id_user').notEmpty().escape(), param('id_product').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.addFavorites(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

/**
 * @route GET /favoritos/{id_user}
 * @group Favoritos
 * @param {String} id_user.path - id do utilizador
 * @returns {object} 200 - Array de todos os produtos adicionados nos favoritos de um utilizador
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/:id_user', [param('id_user').notEmpty().escape()], (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        controller.getFavoritesByUser(req, res)
    } else {
        res.status(404).json(error.array())
    }
});

/**
 * @route DELETE /favoritos/{id_user}/{id_product}
 * @group Favoritos
 * @param {String} id_user.path - id do utilizador
 * @param {String} id_product.path - id do produto
 * @returns {object} 200 - Eliminou o produto dos favoritos
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
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