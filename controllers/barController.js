const express = require('express')
const router = express.Router({ mergeParams: true })

const userModel = require("../models/user")
const barModel = require("../models/bar")

router.get('/', (req, res) => {
    const userId = req.params.userId
    userModel.findById(userId)
        .then((users) => {
            console.log(users)
            barModel.find({})
                .then((bars) => {
                    console.log(bars)
                    res.render('bars/index', {
                        users: users,
                        bars: bars
                    })
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

// //GET Specific Bar Page
// router.get('/:barId', (req, res) => {
//     const userId = req.params.userId
//     const barId = req.params.barId
//     userModel.findById(userId)
//         .then((user) => {
//             const bars = user.bar.id(barId)
//             console.log("BARS", bars)
//             res.render('bars/index', {
//                 bars
//             })
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

module.exports = router