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
router.get('/:userId', (req, res) => {
    userModel.findById(req.params.userId)
        .then((users) => {
            console.log("USERS")
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
    userModel.findByIdAndUpdate(req.params.userId, req.body)
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

//GET Edit User Info View 
router.get('/:userId/edit', (req, res) => {
    userModel.findById(req.params.userId)
        .then((users) => {
            res.render('users/edit', {
                id: req.params.userId,
                users
            })
        })
})

//DELTE User 
// delete
router.delete('/:userId', (req, res) => {
    userModel.findByIdAndRemove(req.params.userId)
        .then(() => {
            res.redirect('/users')
        })
})

router.post('/', (req, res) => {
    const User = new User({
        name: req.body.name,
        username: req.body.username,
        age: req.body.age,
        location: req.body.location,
        image: req.body.image,
        bio: req.body.bio
    })
    User.save()
        .then((savedUser) => {
            res.redirect(`/users/${savedUser._id}`)
        })
})

module.exports = router