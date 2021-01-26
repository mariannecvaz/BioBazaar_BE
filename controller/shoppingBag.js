const shoppingBag = require('../models/shoppingBag.js');
const products = require('../models/products.js')

const addShoppingBag = (req, res) => {
    products.find({
        id_product: req.params.id_product
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            const newShoppingBag = new shoppingBag({
                id_user: req.params.id,
                id_product: req.params.id_product,
                name: result[0].name,
                price: result[0].price,
                image: result[0].img,
                count: 1
            })
            shoppingBag.find({
                id_user: req.params.id,
                id_product: req.params.id_product
            }, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    if (result.length > 0) {
                        result[0].price = result[0].price * 2
                        result[0].count += 1
                        result[0].markModified("added")
                        result[0].save();
                        console.log(result)
                        res.status(200).json("Produto Adicionado")

                    } else {
                        newShoppingBag.save(function (err, result) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            res.status(200).json("Produto Adicionado")
                        })
                    }

                }
            })

        }
    })
}

const getShoppingBagByUser = (req, res) => {
    shoppingBag.find({
        id_user: req.params.id
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {

            res.status(200).json(result)
        }

    })
}

const deleteProduct = (req, res) => {

    shoppingBag.find({
        id_user: req.params.id,
        id_product: req.params.id_product
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            if (result[0].count > 1) {
                result[0].price = result[0].price / 2
                result[0].count -= 1
                result[0].markModified("added")
                result[0].save();
                console.log(result)
                res.status(200).json("Produto Removido")

            } else {
                shoppingBag.deleteOne({
                    id_user: req.params.id,
                    id_product: req.params.id_product
                }, function (err, shoppingBag) {
                    if (err) {
                        res.status(400).send(err)
                    }
                    if (shoppingBag) {
                        res.status(200).send("Produto Eliminado!")
                    }
                })
            }
        }
    })
}


exports.addShoppingBag = addShoppingBag;
exports.getShoppingBagByUser = getShoppingBagByUser;
exports.deleteProduct = deleteProduct;