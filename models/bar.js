const Schema = require('../db/schema')
const mongoose = require('mongoose')

const Bar = mongoose.model('Bar', Schema.BarsSchema)
module.exports = Bar