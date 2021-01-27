require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT 
const utilities = require('./utilities/utilities.js')
const mongoose = require('./Database/mongoconfig')
const productsRoute = require('./route/products')
const usersRoute = require('./route/user')
const ordersRoute = require('./route/orders')
const favoritesRoute = require('./route/favorites')

const shoppingBagRoute = require('./route/shoppingBag')
const categoryRoute = require('./route/category')
app.use(express.json());
app.use('/produtos', productsRoute)
app.use('/', usersRoute)
app.use('/encomendas', ordersRoute)
app.use('/favoritos', favoritesRoute)
app.use('/sacoCompras', shoppingBagRoute)
app.use('/',categoryRoute)
//Authorization - login

const auth = function(req, res, next) {
    console.log(req.url)
    if(utilities.exceptions.indexOf(req.url) >= 0 || req.url.indexOf('login?code') != -1)  {
        next(); 
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if(result) {
                next(); 
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    }
}

app.use(auth)
app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log(`Ready on ${port}`);
})
