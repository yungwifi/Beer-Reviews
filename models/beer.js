const Schema = require('../db/schema')
const mongoose = require('mongoose')

const Beer = mongoose.model('Beer', Schema.BeersSchema)
module.exports = Beer