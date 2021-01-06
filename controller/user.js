const WooCommerce = require('../Database/dbconfig.js')
const bcrypt = require('bcrypt')
const utilities = require('../utilities/utilities.js')
const coinsController = require('../controller/coins')
const user = require('../models/users.js')


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

// EDIT USER COM MONGOOSE
const editUserM = (req, res) => {

  user.findOne({_id:req.params.id}, function (err, user) {
      if (err) {
          res.status(400).send(err)
      }
      if(user){
          user.email = req.body.email
          user.password = req.body.password
          user.username = req.body.username
          user.coins = req.body.coins
          user.adress = req.body.adress
          user.zipCode = req.body.zipCode
          user.country = req.body.country
          user.city = req.body.city
          user.save()
          res.status(200).send("Utilizador Editado!")
      }
  })

}

/**MONGOOSE LOGIN E REGIST */

const registerM = (req, res) => {

  bcrypt.genSalt(10, function (err, salt) {

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newUser = new user({ email: req.body.email, password: hash, username: req.body.username,name: req.body.name, coins: 0, adress: "", zipCode: "", country: "", city: "" })

      user.find({ email: req.body.email }, function (err, user) {
        if (err) {
          res.status(400).send(err)
        }
        if (user.length > 0) {
          res.status(406).send("User already exists!")
        } else {
          newUser.save(function (err, newUser) {
            if (err) {
              res.status(400).send(err)
            } else {
              res.status(200).json("User Registered!")
            }
          })
        }
      })
    })
  })
}

const loginM = (req, res) => {
  user.find({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).send(err)
    }
    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password).then(function (result) {
        if (result) {
          utilities.generateToken({ user: req.body.email }, (token) => {
            res.status(200).json(token)
          })
        } else {
          res.status(401).send("Wrong Password")
        }
      })
    } else {
      res.status(401).send("Wrong email")

    }
  })
}


exports.registerM = registerM;
exports.loginM = loginM;
exports.editUserM = editUserM;


exports.createUser = createUser;
exports.login = login;
exports.getAllUsers = getAllUsers;
exports.editUser = editUser;
exports.getUserbyId = getUserbyId;

