const order = require('../models/orders.js');

const addOrder = (req, res) => {
    const newOrder = new order ({
        id_user: req.params.id,
        name: req.body.name,
        adress: req.body.adress,
        zipCode: req.body.zipCode,
        contact: req.body.contact,
        email: req.body.email,
        city: req.body.city,
        products: req.body.products,
        total: req.body.total,
    })
    console.log(newOrder)
    order.find(function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            newOrder.save(function (err, result) {
                if (err) {
                    res.status(400).send(err);
                }
                res.status(200).json("¨Pedido Enviado!")
            })
        }
    })
}

const orderByUser = (req, res) => {
    order.find({
        id_user: req.params.id
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(result)
        }
    })
}

exports.addOrder = addOrder;
exports.orderByUser = orderByUser