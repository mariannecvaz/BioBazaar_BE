require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000;

const mongoose = require('./Database/mongoconfig')
const productsRoute = require('./route/products')
const usersRoute = require('./route/user')
const ordersRoute = require('./route/orders')
const favoritesRoute = require('./route/favorites')
const coinsRoute = require('./route/coins')
const shoppingBagRoute = require('./route/shoppingBag')

app.use(express.json());
app.use('/produtos', productsRoute)
app.use('/', usersRoute)
app.use('/encomendas', ordersRoute)
app.use('/favoritos', favoritesRoute)
app.use('/pontos', coinsRoute)
app.use('/sacoCompras', shoppingBagRoute)

app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log(`Ready on ${port}`);
})
