const express = require('express')
const router = express.Router()

const barModel = require("../models/bar")

router.get('/', (req, res) => {
    barModel.find({})
        .then((bars) => {
            console.log("BARS", bars)
            res.render('bars/index', {
                bars
            })
        })
})

router.get('/:id', (req, res) => {
    barModel.findById(req.params.id)
        .then((bars) => {
            console.log("bars", bars)
            res.render('bars/details', {
                Bars: bars
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router