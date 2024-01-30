const { hashPassword, passwordCheck } = require("../helpers/authHelper")
const mongoose = require('mongoose')
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const orderModel = require("../models/orderModel")

const registerController = async (req,res) =>{
    try {
        const {name,email,password,address,phone,answer} = req.body

        const existingUser = await userModel.findOne({email})
        
        if(existingUser){
            return res.status(400).send({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword = hashPassword(password)

        const newUser = await userModel.create({name,email,password:hashedPassword,address,phone,answer})

        res.status(201).send({
            success:true,
            message:"User created successfully",
            details: newUser
        })
        
    } catch (error) {
       res.status(500).send({
        message:"User can't be registerd",
        error:error,
        success:false
       }) 
    }
}

const loginController = async (req,res)=>{

    const {email,password} = req.body

    try {   
        if(!email||!password){
            return res.status(401).send({
                success:false,
                message:"Invalid email or password",
            })
        }

        const userExist = await userModel.findOne({email})

        if(!userExist){
            return res.status(401).send({
                success:false,
                message:"Invalid email user not Found",
            })
        }

        const matchPass = passwordCheck(password,userExist.password)

        if(!matchPass){
            return res.status(401).send({
                success:false,
                message:"Invalid password",
            })  
        }

        const token = await jwt.sign({id:userExist._id},process.env.JWT_SECRET)

        return res.status(200).send({
            success:true,
            message:"Login successful",
            userDetails:{
              name:userExist.name,
              email:userExist.email,
              role:userExist.role,
              phone:userExist.phone,
              address:userExist.address  
            },
            token:token
        })


    } catch (error) {
        res.status(500).send({
            message:"User can't be logged in",
            error:error,
            success:false
           })  
    }
}

const testController = async(req,res) =>{
    res.status(200).send({message:"Test sucessfull completed"})
}

const forgotPassword = async(req,res) =>{
   const {answer,email,password} = req.body 

   try{

        const User = await userModel.findOne({email})


        if(!User){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }

        if(User.answer !== answer){
            return res.status(400).send({
                success:false,
                message:"Answer dosent match"
            })
            
        }

        const hashedvalue = hashPassword(password)

        const update = await userModel.findByIdAndUpdate(User._id,{password:hashedvalue})

        return res.status(200).send({
            sucess:true,
            message:"password has been updated login again"
        })
   }catch(error){
        return res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
   }
}


const getOrdersController = async(req,res) =>{
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate('products')
        res.json(orders)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        }) 
    }
}

module.exports = {
    registerController,
    loginController,
    testController,
    forgotPassword,
    getOrdersController
}