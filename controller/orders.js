const WooCommerce = require('../Database/dbconfig.js');

//Função que cria uma encomenda
const createOrder = (req, res) => {
    const newOrder = {
        email: req.body.email,
        total: req.body.total,
        items: req.body.items
    }
    WooCommerce.post("orders", newOrder)
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((error) => {
            res.status(404).json(error.response.data)
        });
}
//Função lista encomendas por cliente
const getOrders = (req, res) => {

    WooCommerce.post("orders")
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((error) => {
            res.status(404).json(error.response.data)
        });
}

//Função lista encomendas por cliente
//customer_id nao funciona?
const listOrderByClient = (req, res) => {

    WooCommerce.post("orders/" + req.params.customer_id)
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((error) => {
            res.status(404).json(error.response.data)
        });
}

exports.createOrder = createOrder;
exports.getOrders  = getOrders;
exports.listOrderByClient = listOrderByClient
