const express = require('express');
const { registerController, loginController, testController, forgotPassword, getOrdersController } = require('../controllers/userControllers');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController)

//forgot-password
router.post('/forgot-password', forgotPassword)

//test route 
router.get('/test',protect,isAdmin,testController)

//protected user route auth
router.get('/user-auth', protect , (req,res)=>{
    res.status(200).send({ok:true})
})

//protected admin route auth
router.get('/admin-auth', protect ,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

//orders
router.get('/orders', protect , getOrdersController)


module.exports = router