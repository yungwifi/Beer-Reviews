const Schema = require('../db/schema')
const mongoose = require('mongoose')

const barModel = mongoose.model('Bar', Schema.BarsSchema)
module.exports = Bar