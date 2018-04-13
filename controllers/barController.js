const express = require('express')
const router = express.Router({ mergeParams: true })

const userModel = require("../models/user")
const barModel = require("../models/bar")

//GET Specific Bar Page
router.get('/:barsId', (req, res) => {

    userModel.findById(req.params.userId)
        .then((users) => {
            console.log(users)
            const bar = users.bars.id(req.params.barsId)
            res.render('bars/details', {
                userId,
                bars
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

// POST New Bar
router.post('/', (req, res) => {
    const userId = req.params.userId
    console.log('Req body new bar: ', req.body)
    const newBar = new barModel({
        name: req.body.name,
        location: req.body.location,
        rating: req.body.rating
    })
    newBar.save()
        .then((savedBar) => {
            res.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

//GET New Bar 
router.get('/new', (req, res) => {
    res.render('bars/new')
})

// DELETE User
router.delete('/:barsId', (req, res) => {
    barModel.findByIdAndRemove(req.params.barId)
        .then(() => {
            res.redirect(`/users/${userId}`)
        })
        .catch((err) => {
            console.log(err)
        })
})
router.delete('/:barsId', (req, res) => {
    User.findById(req.params.userId)
        .then((user) => {
            const bar = user.bars.id(req.params.barsId)
            bar.remove()
            return user.save()
        }).then(() => {
            res.redirect(`/users/${req.params.userId}/bars`)
        })
})


module.exports = router