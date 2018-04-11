const Schema = require('../db/schema')
const mongoose = require('mongoose')

const userModel = mongoose.model('User', Schema.UserSchema)
module.exports = userModel