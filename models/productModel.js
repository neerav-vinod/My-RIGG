const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
    },
    quantity:{
        type:Number,
    },
    photo:{
        type:String
    },
    shipping:{
        type:Boolean 
    }
},{timestamps : true})

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel