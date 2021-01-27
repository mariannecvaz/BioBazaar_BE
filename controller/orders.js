const order = require('../models/orders.js');

const addOrder = (req, res) => {
    const newOrder = new order ({
        email: req.params.id,
        name: req.body.name,
        adress: req.body.adress,
        zipCode: req.body.zipCode,
        contact: req.body.contact,
        city: req.body.city,
        nif: req.body.nif,
        companyName: req.body.companyName,
        products: req.body.products,
        total: req.body.total,
        payment: req.body.payment
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
        email: req.params.id
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