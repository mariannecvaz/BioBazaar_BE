const WooCommerce = require('../Database/dbconfig.js')
const bcrypt = require('bcrypt')
const utilities = require('../utilities/utilities.js')
const coinsController = require('../controller/coins')
const user = require('../models/users.js')

// EDIT USER COM MONGOOSE
const editUserM = (req, res) => {

  user.findOne({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.status(400).send(err)
    }
    if (user) {
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
      const newUser = new user({ email: req.body.email, password: hash, username: req.body.username, name: req.body.name, coins: 0, adress: "", zipCode: "", country: "", city: "" })

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
              res.status(200).json({ res: "User Registered!" })
            }
          })
        }
      })
    })
  })
}

const googleAuth = (req, res) => {
  user.findOne({ googleId: userid }).then(
    existingUser => {
      if (!existingUser) {
        utilities.verify(idToken)
        new User({ googleId: userid }).save();
      }
    });
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
            res.status(200).json({ token: token })
            // adiciona na base de dados o token ao user?
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

  user.find(
    { _id: req.params.id }, function (err, user) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).json(user)
      }
    })
}





exports.getUserByIdM = getUserByIdM;
exports.registerM = registerM;
exports.loginM = loginM;
exports.editUserM = editUserM;
exports.googleAuth = googleAuth;

