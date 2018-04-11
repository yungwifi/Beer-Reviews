const express = require('express')
const router = express.Router()

const userModel = require("../models/user")

router.get('/', (req, res) => {
    userModel.find({})
        .then((users) => {
            console.log("USERS", users)
            res.render('users/index', {
                users
            })
        })
})

router.get('/:id', (req, res) => {
    userModel.findById(req.params.id)
        .then((user) => {
            console.log("USERS", user)
            res.render('users/details', {
                User: user
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router