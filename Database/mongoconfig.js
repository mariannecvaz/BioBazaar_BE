const mongoose = require('mongoose');


let mongoConnect;

mongoConnect = mongoose.connect('mongodb+srv://admin:biobazaar@cluster0.byoyf.mongodb.net/biobazaar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to mongooose")
})
db.on('error', console.error.bind(console, "connection error: "))

module.exports = mongoConnect