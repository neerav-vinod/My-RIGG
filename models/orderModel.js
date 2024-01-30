const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products:[{
        type:mongoose.ObjectId,
        ref:"Product"
    }],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:'userModel'
    },
    status:{
        type:String,
        default:'Not Process',
        enum:["Not Process","Processing","Shipped","deliverd","cancel"],
    }
},
{timestamps: true})

const orderModel = new mongoose.model('Order', orderSchema)

module.exports = orderModel;