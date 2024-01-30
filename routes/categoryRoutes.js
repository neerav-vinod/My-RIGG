const express = require('express');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const { createCategory, updateCategory, fetchAllCategories, fetchACategory, deleteCategory } = require('../controllers/categoryControllers');


const router = express.Router();

//category-creation
router.post('/create-category',protect,isAdmin,createCategory)
//category updation
router.put('/update-category/:id',protect,isAdmin,updateCategory)

//fetchAllCategories
router.get('/all-categories',fetchAllCategories)

//fectch-one-category
router.get('/one-category/:slug',fetchACategory)

//delete a category
router.delete('/delete-category/:id',protect,isAdmin,deleteCategory)

module.exports = router