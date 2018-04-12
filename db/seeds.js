const User = require('../models/User')
const Bar = require('../models/Bar')
const Beer = require('../models/Beer')

// connect to database
const mongoose = require('mongoose')
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect('mongodb://localhost/beer-reviews')
}

mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
    console.error(`MongoDB connection error!!! ${error}`)
    process.exit(-1)
})

//Dummy data 
User.remove({})
    .then(() => {
        const farnesDebarnk = new User({
            name: 'Farnes Debarnk',
            username: 'lupinDa3rd',
            photoUrl: 'https://enterprisectr.org/wp-content/uploads/2014/09/bobloblaw.jpg'
        })

        const lowPlaces = new Bar({
            name: 'Low Places',
            location: 'over there',
            rating: '5 stars'
        })
        const yeungling = new Beer({
            name: 'Yeungling',
            style: 'Amber',
            abv: 5,
            rating: '5/5'
        })
        lowPlaces.beers.push(yeungling)

        farnesDebarnk.bars.push(lowPlaces)

        return farnesDebarnk.save()
    }).catch((error) => {
        console.log('ERROR SAVING SEEDED DATA')
        console.log(error)
    }).then(() => {
        mongoose.connection.close()
        console.log(`Finished seeding database... Disconnected from MongoDB`)
    })