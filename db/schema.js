const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BeersSchema = new Schema({
    name: String,
    style: String,
    ABV: Number,
    rating: String
})

const BarsSchema = new Schema({
    name: String,
    location: String,
    rating: String,
    beers: [BeersSchema]
})

const UserSchema = new Schema({
    name: String,
    username: String,
    photo_url: String,
    bars: [BarsSchema]
})

module.exports = {
    UserSchema,
    BarsSchema,
    BeersSchema
}