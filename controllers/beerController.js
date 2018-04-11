const express = require('express')
const router = express.Router()

const beerModel = require("../models/beer")

router.get('/', (req, res) => {
    beerModel.find({})
        .then((beers) => {
            console.log("BEERS", beers)
            res.render('beers/index', {
                beers
            })
        })
})

router.get('/:id', (req, res) => {
    beerModel.findById(req.params.id)
        .then((beers) => {
            console.log("BEERS", beers)
            res.render('beers/details', {
                Beer: beers
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router