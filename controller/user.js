const WooCommerce = require('../Database/dbconfig.js')
// const bcrypt = require('bcrypt')
const utilities = require('../utilities/utilities.js')
const coinsController = require('../controller/coins')

//Função que cria um utilizador
const createUser = (req, res) => {
  const newUser = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  }
  WooCommerce.post(newUser)
    .then((response) => {
      res.status(200).json(response.data)
      // console.log(response.data.id)
      // coinsController.addCoins(response.data.id, req, res)
    })
    .catch((error) => {
      res.status(404).json(error.response.data)
    });
}

const login = (req, res) => {
  const user = {
    username: req.params.username,
    password: req.params.password
  }
  WooCommerce.post(user)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => { 
    res.status(404).json(error)
  });
}

//Get dos Utilizadores - vai buscar todos os utilizadores existentes na base de dados
const getAllUsers = (req, res) => {
  WooCommerce.get("customers")
    .then((response) => {

      res.status(200).json(response.data)
    })
    .catch((error) => {

      res.status(404).json(error.response.data)
    });
}
//Get dos Utilizadores - vai buscar um utilizador por id
const getUserbyId = (req, res) => {
  WooCommerce.get("customers/" + req.params.id)
    .then((response) => {

      res.status(200).json(response.data)
    })
    .catch((error) => {

      res.status(404).json(error.response.data)
    });
}


const editUser = (req, res) => {

  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    billing: {
      first_name: req.body.billingFirstName,
      last_name: req.body.billingLastName,
      company: req.body.billingCompany,
      address_1: req.body.billingAdress,
      city: req.body.billingCity,
      postCode: req.body.billingPostCode,
    },
    shipping: {
      first_name: req.body.shippingFirstName,
      last_name: req.body.shippingLastName,
      company: req.body.shippingCompany,
      address_1: req.body.shippingAdress,
      postCode: req.body.shippingPostCode,
    }
  }

  WooCommerce.put("customers/" + req.params.id, data)
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      console.log(error.response.data);
    });

}

exports.createUser = createUser;
exports.login = login;
exports.getAllUsers = getAllUsers;
exports.editUser = editUser;
exports.getUserbyId = getUserbyId;

