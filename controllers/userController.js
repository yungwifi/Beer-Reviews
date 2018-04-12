const express = require('express')
const router = express.Router()

const userModel = require("../models/user")

// DELETE User
router.delete('/:userId', (req, res) => {
    userModel.findByIdAndRemove(req.params.userId)
        .then(() => {
            res.redirect('/users')
        })
        .catch((err) => {
            console.log(err)
        })
})

// POST New User 
router.post('/', (req, res) => {
    console.log('Req body new user: ', req.body)
    const newUser = new userModel({
        name: req.body.name,
        username: req.body.username,
        age: req.body.age,
        location: req.body.location,
        image: req.body.image,
        bio: req.body.bio
    })
    newUser.save()
        .then((savedUser) => {
            res.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })
})

//GET new user page
router.get('/new', (req, res) => {
    res.render('users/new')
})

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

//GET Edit User Info View 
router.get('/:userId/edit', (req, res) => {
    userModel.findById(req.params.userId)
        .then((users) => {
            res.render('users/edit', {
                users
            })
        })
})

//PUT Update User 
router.put('/:userId', (req, res) => {
    console.log(req.body)
    userModel.findByIdAndUpdate(req.params.userId, req.body)
        .then((users) => {
            console.log(users)
            res.redirect(`/users/${users.id}`)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router