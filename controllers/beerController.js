const express = require('express')
const router = express.Router()

const beerModel = require("../models/beer")

//GET All Beers
router.get('/', (req, res) => {
    beerModel.find({})
        .then((beers) => {
            console.log("BEERS", beers)
            res.render('beers/index', {
                beers
            })
        })
})

//GET Specific Beer 
router.get('/:id', (req, res) => {
    beerModel.findById(req.params.id)
        .then((beers) => {
            console.log("BEER", beers)
            res.render('beers/details', {
                beers
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//PUT Update Beer 
router.put('/:id', (req, res) => {
    console.log(req.body)
    beerModel.findByIdAndUpdate(req.params.id, req.body)
        .then((beers) => {
            console.log(beers)
            res.render('beers/details', {
                beers
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

// POST a new Beer
router.post('/:id', (req, res) => {
    beerModel.findById(req.params.id)
        .then((beers) => {
            bars.beers.push(new Beer({
                name: req.body.name
            }))
            return beers.save()
        })
        .then((beers) => {
            console.log(beers)
            res.render('beers/details', {
                beers
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//DELETE a Beer 
router.delete('/:id', function (req, res) {
    beerModel.findByIdAndRemove(req.params.id)
        .then((beers) => {
            console.log('Beer deleted');
            res.render('beers/index', {
                beers
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router