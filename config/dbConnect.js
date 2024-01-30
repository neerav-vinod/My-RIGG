const mongoose = require('mongoose');
const color = require('colors')

const dbConnection=()=>{
    try {
        const connect = mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to Database`.bgGreen.bold);
    } catch (error) {
        console.log(`Cant connect to Database ${error}`.bgRed);
    }
}

module.exports = dbConnection