const WooCommerce = require('../Database/dbconfig.js')
const bcrypt = require('bcrypt')
const utilities = require('../utilities/utilities.js')
const coinsController = require('../controller/coins')
const user = require('../models/users.js')

// EDIT USER COM MONGOOSE
const editUserM = (req, res) => {

  user.findOne({
    email: req.params.id
  }, function (err, user) {
    if (err) {
      res.status(400).send(err)
    }
    if (user) {
      bcrypt.genSalt(10, function (err, salt) {

        bcrypt.hash(req.body.passwordNew, salt, function (err, hash) {
          user.password = hash
          user.name = req.body.name
          user.email = req.body.email
          user.coins = req.body.coins
          user.adress = req.body.adress
          user.zipCode = req.body.zipCode
          user.country = req.body.country
          user.city = req.body.city
          user.nif = req.body.nif
          user.companyName = req.body.companyName
          user.phone = req.body.phone
          user.save() 
          res.status(200).send(user)
         
        })
      })

    }
  })
}
/**MONGOOSE LOGIN E REGIST */

const registerM = (req, res) => {

  bcrypt.genSalt(10, function (err, salt) {

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newUser = new user({
        email: req.body.email,
        password: hash,
        username: req.body.username,
        name: req.body.name,
        coins: 0,
        adress: "",
        zipCode: "",
        country: "",
        city: "",
        nif: "",
        companyName: "",
        contact: ""
      })

      user.find({
        email: req.body.email
      }, function (err, user) {
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
              res.status(200).json({
                res: "User Registered!"
              })
            }
          })
        }
      })
    })
  })
}

const googleAuth = (req, res) => {
  var decodedToken = jwt_decode(req.body.token)
  const username = decodedToken.name
  const userEmail = decodedToken.email
  user.find({
    email: userEmail
  }, function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    if (user.length > 0) {
      user.findOne({
        email: userEmail
      }, function (err, results) {
        if (err) {
          res.status(400).send(err);
        }
        if (!results) {
          utilities.generateToken({
            email: userEmail,
            username: username,
          }, (token) => {
            res.status(200).json({
              token: token
            });
          })
        }
      })
    } else if (user.length == 0) {
      const userToCreate = new user({
        username: username,
        password: "",
        email: userEmail,
        coins: 0,
        adress: "",
        zipCode: "",
        country: "",
        city: "",
        nif: "",
        companyName: "",
        contact: ""
      });

      userToCreate.save(function (err, newUser) {
        if (err) {
          res.status(400).send(err);
        }
        utilities.generateToken({
          email: userEmail,
          username: username,
        }, (token) => {
          res.status(200).json({
            token: token
          });
        })
      })
    } else {
      res.status(401).send("Not Authorized");
    }
  })
}

const loginM = (req, res) => {
  user.find({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      res.status(400).send(err)
    }
    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password).then(function (result) {
        if (result) {
          utilities.generateToken({
            user: req.body.email
          }, (token) => {
            res.status(200).json({
              user: user[0]
            })
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

//GET USER COM MONGO
const getUserByIdM = (req, res) => {

  user.find({
    _id: req.params.id
  }, function (err, user) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(user)
    }
  })
}

const editCoins = (req, res) => {

  user.findOne({
    email: req.params.id
  }, function (err, user) {
    if (err) {
      res.status(400).send(err)
    }
    if (user) {
      user.coins = req.body.coins
      user.save()
      res.status(200).send("Pontos Editados!")
    }
  })

}


exports.editCoins = editCoins;
exports.getUserByIdM = getUserByIdM;
exports.registerM = registerM;
exports.loginM = loginM;
exports.editUserM = editUserM;
exports.googleAuth = googleAuth;