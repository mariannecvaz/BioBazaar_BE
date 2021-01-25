const favorites = require('../models/favorites.js');
const WooCommerce = require('../Database/dbconfig.js')


//Função que adiciona um determinado produto aos favoritos
const addFavorites = (req, res) => {
    products.find({
        id_product: req.params.id_product
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            const newFav = new favorite({
                id_user: req.params.id,
                id_product: req.params.id_product,
                name: result[0].name,
                price: result[0].price,
                image: result[0].image
            })
            favorites.find({
                id_user: req.params.id,
                id_product: req.params.id_product
            }, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    newFav.save(function (err, result) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        res.status(200).json("Produto Adicionado")
                    })
                }
            })

        }
    })
}

//Função que lista os produtos adicionados aos favoritos de um determinado utilizador
const getFavoritesByUser = (req, res) => {
    favorites.find({
        id_user:req.params.id
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
           
           res.status(200).json(result)
        }

    })
}

//Função que elimina um determinado produto dos favoritos
const deleteFav = (req, res) => {

    favorites.deleteOne({id_user:req.params.id_user, id_product:req.params.id_product}, function (err, favorites) {
        if (err) {
            res.status(400).send(err)
        }
       else{
            res.status(200).send("Favorito Eliminado!")
            console.log(favorites)
        }
    })

}

exports.deleteFav = deleteFav;
exports.addFavorites = addFavorites;
exports.getFavoritesByUser = getFavoritesByUser;
