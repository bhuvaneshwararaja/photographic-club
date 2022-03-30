var mongoose = require('mongoose')

var url = "mongodb+srv://bhuvanesh:Bhuvanesh007@cluster0.0nayn.mongodb.net/PhotoGraphyclub?retryWrites=true&w=majority";

let connectDB = () => {
    mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    console.log("DB connected")
} 


module.exports = connectDB
