const express = require('express')
const router = express.Router()

const userModel = require("../models/user")

//GET Users 
router.get('/', (req, res) => {
    userModel.find({})
        .then((users) => {
            console.log("USERS", users)
            res.render('users/index', {
                users
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//GET Specific User
router.get('/:id', (req, res) => {
    userModel.findById(req.params.id)
        .then((users) => {
            console.log("USERS", users)
            res.render('users/details', {
                users
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

//PUT Update User 
router.put('/:id', (req, res) => {
    console.log(req.body)
    userModel.findByIdAndUpdate(req.params.id, req.body)
        .then((users) => {
            console.log(users)
            res.render('users/details', {
                users
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

// POST a new User 
router.post('/:id', (req, res) => {
    userModel.findById(req.params.id)
        .then((users) => {
            users.push(new User({
                name: req.body.name
            }))
            return users.save()
        })
        .then((users) => {
            console.log(users)
            res.render('users/details', {
                users
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router