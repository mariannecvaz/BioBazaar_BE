const favorites = require('../models/favorites.js');
const WooCommerce = require('../Database/dbconfig.js')


//Função que adiciona um determinado produto aos favoritos
const addFavorites = (req, res) => {
    WooCommerce.get("products/" + req.params.id_product)
        .then((response) => {
            const newFavorite = new favorites({
                id_user: req.params.id,
                id_product: response.data.id,
                name: response.data.name,
                price: response.data.price,
                image: response.data.images[0].src
            })
            favorites.find({ id_user: req.params.id, id_product: req.params.id_product }, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    newFavorite.save(function (err, result) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        res.status(200).json("Favorito Adicionado")
                    })
                }
            })
        })
        .catch((error) => {

            res.status(404).json("error")
        });
}

//Função que lista os produtos adicionados aos favoritos de um determinado utilizador
const getFavoritesByUser = (req, res) => {
    favorites.find({
        email:req.params.id
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

    favorites.deleteOne({id_user: req.params.id, id_product: req.params.id_product}, function (err, favorites) {
        if (err) {
            res.status(400).send(err)
        }
        if(favorites){
            res.status(200).send("Favorito Eliminado!")
        }
    })

}

exports.deleteFav = deleteFav;
exports.addFavorites = addFavorites;
exports.getFavoritesByUser = getFavoritesByUser;
