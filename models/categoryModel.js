const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    slug:{
        type: String,
        lowercase:true,
    }
})

const categoryModel = new mongoose.model('Category', categorySchema)

module.exports = categoryModel;