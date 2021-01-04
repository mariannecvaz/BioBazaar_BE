const coins = require('../models/coins');


const editCoins = (req, res) => {
    coins.findOne({ _id: req.params.id }, function (err, car) {
        if (err) {
            res.status(400).send(err)
        }
        //Orders, ou seja se acontecer encomenda adiciona, se usar desconto retira pontos
        if (coins) {
            coins.coins += 1
            coins.save()
            res.status(200).send("Mais uma Coin!!")
        }
        // else{
        //     coins.coins -= 5
        //     coins.save()
        //     res.status(200).send("Menos uma Coin!!")
        // }
    })
}

//ERROR:Cannot set headers after they are sent to the client
const addCoins = ( id_user,req, res) => {
    const newCoins = new coins({
        id_user: id_user,
        coins: 0
    })
    coins.find({coins}, function (err, coins) {
        if (err) {
            res.status(400).send(err)

        } else {
            newCoins.save(function (err, newCoins) {
                if (err) {
                    res.status(400).send(err)

                } else {
                    res.status(200).json("Linha adicionada!")
                }
            })
        }
    })
}

const getCoinsByUser = (req, res) => {
    coins.find({
        id_user: req.params.id
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else {

            res.status(200).json(result)
        }

    })
}

exports.editCoins = editCoins
exports.addCoins = addCoins
exports.getCoinsByUser = getCoinsByUser