const express = require('express')
const router = express.Router()

const userModel = require("../models/user")
const barModel = require("../models/bar")
const beerModel = require("../models/beer")

// POST New Beer
router.post('/', (req, res) => {
    console.log('Req body new beer: ', req.body)
    const newBeer = new beerModel({
        name: req.body.name,
        style: req.body.style,
        abv: req.body.abv,
        rating: req.body.rating
    })
    newBeer.save()
        .then((savedBeer) => {
            res.redirect(`/users/${userId}/bars/${barId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

//GET New Beer
router.get('/new', (req, res) => {
    res.render('beers/new')
})

//GET Specific Beer 
router.get('/:beerId', (req, res) => {
    const userId = req.params.userId
    const barId = req.params.barId
    const beerId = req.params.beerId

    userModel.findById(userId)
        .then((user) => {
            const bar = user.bars.id(barId)
            const beer = bars.beers.id(beerId)

            response.render('beer/details', {
                userId,
                bar,
                beer
            })
        })
        .catch((error) => {
            console.log(error)
        })
})


module.exports = router