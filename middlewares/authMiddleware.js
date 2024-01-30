const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')


const protect = async(req,res,next) =>{
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const verified = await jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified
        next();
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Invalid Authorization(please resign in)"
        })
    }
}

const isAdmin = async(req,res,next) =>{
        const {id} = req.user
    try {   
        const userDetails = await userModel.findOne({_id:id})

        if(!userDetails){
            return res.status(400).send({
                success:false,
                message:"You are not authorized to access this (login again)"
            }) 
        }
        if(userDetails.role !== 1){
            return res.status(400).send({
                success:false,
                message:"You are not authorized to access this"
            })  
        }
        next();
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"You are not authorized to access this"
        })  
    }
}

module.exports = {
    protect,
    isAdmin
}