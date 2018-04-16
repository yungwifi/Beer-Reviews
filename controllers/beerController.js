const express = require('express')
const router = express.Router({ mergeParams: true })

const userModel = require("../models/user")
const barModel = require("../models/bar")
const beerModel = require("../models/beer")

// POST New Beer
router.post('/', (req, res) => {
    const userId = req.params.id
    const barId = req.params.barsId
    const newBeer = req.body
    console.log('Req body new beer: ', req.body)

    userModel.findById(userId)
        .then((users) => {
            const newBeer = new beerModel({
                name: req.body.name,
                style: req.body.style,
                abv: req.body.abv,
                rating: req.body.rating
            })
            const bar = users.bars.id(barId)
            bar.beers.push(newBeer)
            return users.save()
        })
        .then((savedBeer) => {
            res.redirect(`/users/${userId}/bars/${req.params.barsId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})


//GET New Beer
router.get('/new', (req, res) => {
    const userId = req.params.id
    const barId = req.params.barsId
    const beerId = req.params.beersId
    userModel.findById(userId)
        .then((users) => {
            res.render('beers/new', {
                barId,
                userId,
                beerId,
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//GET Edit Beer Info View 
router.get('/:beerId/edit', (req, res) => {
    const userId = req.params.id
    const barId = req.params.barsId
    const beersId = req.params.beerId

    userModel.findById(userId)
        .then((users) => {
            const bar = users.bars.id(barId)
            const beer = bar.beers.id(beersId)
            res.render('beers/edit', {
                users,
                bar,
                beer,
                userId,
                beersId,
                barId
            })
        })
})

//PUT Update Beer 
router.put('/:beerId', (req, res) => {
    const userId = req.params.id
    console.log(userId)
    const barId = req.params.barsId
    const beersId = req.params.beerId

    userModel.findByIdAndUpdate(userId)
        .then((users) => {
            console.log("users", users)
            console.log("REQUEST BODY", req.body)
            const bar = users.bars.id(barId)
            const beer = bar.beers.id(beersId)
            beer.name = req.body.name,
                beer.style = req.body.style,
                beer.abv = req.body.abv,
                beer.rating = req.body.rating

            return users.save()
        }).then((updatedUser) => {
            res.redirect(`/users/${userId}/bars/${req.params.barsId}/beers/${req.params.beerId}`)
        })
        .catch((err) => {
            console.log(err)
        })
})

//GET Specific Beer 
router.get('/:beerId', (req, res) => {
    const userId = req.params.id
    const barsId = req.params.barsId
    const beerId = req.params.beerId

    console.log("Looking up user", userId)
    console.log("Looking up bar", barsId)
    console.log("Looking up beer", beerId)

    userModel.findById(userId)
        .then((users) => {
            console.log(users)
            const bar = users.bars.id(barsId)
            const beer = bar.beers.id(beerId)
            res.render('beers/details', {
                barsId,
                beerId,
                userId,
                users,
                bar,
                beer
            })
        })
        .catch((error) => {
            console.log(error)
        })
})


module.exports = router