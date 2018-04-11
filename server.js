require('dotenv').config();
const express = require('express')
const hbs = require('hbs')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'hbs')

//local host port
const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log(`app listening on PORT ${PORT}`)
})

// Mongoose stuff
const mongoose = require('mongoose')
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect('mongodb://localhost/regifter')
}
const db = mongoose.connection

db.on('error', function (err) {
    console.log(err)
})

db.once('open', function () {
    console.log('database has been connected!')
})

//routes
//routes
const userController = require('./controllers/userController.js')
app.use('/users', userController)

const barController = require('./controllers/barController.js')
app.use('/bars', barController)

const beerController = require('./controllers/beerController.js')
app.use('/beers', beerController)

app.get('/', function (req, res) {
    res.redirect('/users')
})