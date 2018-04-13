const express = require('express')
const router = express.Router({ mergeParams: true })

const userModel = require("../models/user")
const barModel = require("../models/bar")

// POST New Beer
router.post('/', (req, res) => {
    console.log('Req body new bar: ', req.body)
    const newBar = new barModel({
        name: req.body.name,
        location: req.body.location,
        rating: req.body.rating
    })
    newBar.save()
        .then((savedBar) => {
            res.redirect('/bars')
        })
        .catch((error) => {
            console.log(error)
        })
})

//GET New Bar 
router.get('/new', (req, res) => {
    res.render('beers/new')
})

//GET Specific Bar Page
router.get('/:barId', (req, res) => {
    const userId = req.params.userId
    const barId = req.params.barId

    userModel.findById(userId)
        .then((users) => {
            console.log(users)
            const bars = users.bars.id(barId)
            res.render('bars/details', {
                userId,
                bars
            })
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router