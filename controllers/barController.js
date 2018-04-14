const express = require('express')
const router = express.Router({ mergeParams: true })

const barModel = require("../models/bar")
const userModel = require("../models/user")

//POST New Bar 
router.post('/', (req, res) => {
    console.log(req.params.id)
    const userId = req.params.id
    const newBar = req.body

    userModel.findById(userId)
        .then((users) => {
            const newBar = new barModel({
                name: req.body.name,
                location: req.body.location,
                rating: req.body.rating
            })

            users.bars.push(newBar)
            return users.save()
        }).then((updatedUser) => {
            res.redirect(`/users/${req.params.id}/`)
        })
})

//GET New Bar 
router.get('/new', (req, res) => {
    const userId = req.params.id
    userModel.findById(userId)
    res.render('bars/new', {
        userId
    })
})

// DELETE Bar
router.delete('/:barsId', (req, res) => {
    const userId = req.params.id
    userModel.findById(userId)
        .then((user) => {
            user.bars.id(req.params.barsId).remove()
            return user.save()
        }).then(() => {
            res.redirect(`/users/${req.params.id}/`)
        })
        .catch((err) => {
            console.log(err)
        })
})

//GET Specific Bar Page
router.get('/:barsId', (req, res) => {
    const userId = req.params.id
    const barsId = req.params.barsId
    console.log('SHOW ROUTE HIT')
    userModel.findById(req.params.id)
        .then((users) => {
            console.log(users)
            const bar = users.bars.id(req.params.barsId)
            res.render('bars/details', {
                barsId,
                userId,
                users,
                bar
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router