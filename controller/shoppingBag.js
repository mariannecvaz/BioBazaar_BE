const shoppingBag = require('../models/shoppingBag.js');
const WooCommerce = require('../Database/dbconfig.js')


//Função que adiciona um determinado produto ao saco das compras
const addShoppingBag = (req, res) => {
    WooCommerce.get("products/" + req.params.id_product)
        .then((response) => {
            const newShoppingBag = new shoppingBag({
                id_user: req.params.id,
                id_product: response.data.id,
                name: response.data.name,
                price: response.data.price,
                image: response.data.images[0].src
            })
            shoppingBag.find({ id_user: req.params.id, id_product: req.params.id_product }, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    newShoppingBag.save(function (err, result) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        res.status(200).json("Produto Adicionado")
                    })
                }
            })
        })
        .catch((error) => {

            res.status(404).json("error")
        });
}

//Função que lista os produtos no Saco de compras de um determinado utilizador
const getShoppingBagByUser = (req, res) => {
    shoppingBag.find({
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

//Função que elimina um determinado produto do saco das compras
const deleteProduct = (req, res) => {
    shoppingBag.deleteOne({id_user: req.params.id, id_product: req.params.id_product}, function (err, shoppingBag) {
        if (err) {
            res.status(400).send(err)
        }
        if(shoppingBag){
            res.status(200).send("Produto Eliminado!")
        }
    })

}

exports.addShoppingBag = addShoppingBag;
exports.getShoppingBagByUser = getShoppingBagByUser;
exports.deleteProduct = deleteProduct;