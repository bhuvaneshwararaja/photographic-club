var mongoose = require('mongoose')

var url = "mongodb://localhost:27017/PhotoGraphyClub";

let connectDB = () => {
    mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    console.log("DB connected")
} 


module.exports = connectDB
