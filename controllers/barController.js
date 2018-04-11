const express = require('express')
const router = express.Router()

const barModel = require("../models/bar")

//GET Show Alls Bars Page
router.get('/', (req, res) => {
    barModel.find({})
        .then((bars) => {
            console.log("BARS", bars)
            res.render('bars/index', {
                bars
            })
        })
})

//GET Specific Bar Page
router.get('/:id', (req, res) => {
    barModel.findById(req.params.id)
        .then((bars) => {
            console.log("bars", bars)
            res.render('bars/details', {
                bars
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//PUT Update Bar
router.put('/:id', (req, res) => {
    console.log(req.body)
    barModel.findByIdAndUpdate(req.params.id, req.body)
        .then((bars) => {
            console.log(bars)
            res.render('bars/details', {
                bars
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//POST a new Bar
router.post('/:id', (req, res) => {
    barModel.findById(req.params.id)
        .then((bars) => {
            bars.users.push(new Bar({
                name: req.body.name
            }))
            return bars.save()
        })
        .then((bars) => {
            console.log(bars)
            res.render('bars/details', {
                bars
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//DELETE a Bar 
router.delete('/:id', function (req, res) {
    barModel.findByIdAndRemove(req.params.id)
        .then((bars) => {
            console.log('Bar deleted');
            res.render('bars/index', {
                bars
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router