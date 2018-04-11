const Schema = require('../db/schema')
const mongoose = require('mongoose')

const beerModel = mongoose.model('Beer', Schema.BeersSchema)
module.exports = Beer