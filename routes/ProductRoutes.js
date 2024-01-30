const express = require('express');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const formidable = require('express-formidable');
const { createProductController, fetchAllProducts, getAProduct, fetchProductPhoto, deleteAProduct, updateProductController, productFilterController, productCountController, productListController, searchController, realtedProductController, braintreeTokenController, braintreePaymentsController } = require('../controllers/productControllers');
const upload = require('../middlewares/multerMiddleware');


const router = express.Router();

//routes
router.post('/create-product', protect,isAdmin,upload.single('photo'),createProductController)
//getproducts
router.get('/get-products',fetchAllProducts)
//get one product
router.get('/one-product/:slug',getAProduct)
//delete product 
router.delete('/delete-product/:id',protect,isAdmin,deleteAProduct)
//update a product
router.put('/update-product/:id', protect,isAdmin,upload.single('photo'),updateProductController)
//filter product
router.post('/product-filters', productFilterController)
//product count
router.get('/product-count', productCountController)
//product per page
router.get('/product-list/:page', productListController)
//search controller
router.get('/search-product/:keyword', searchController)
//similar Products
router.get('/related-product/:pid/:cid', realtedProductController)


//payments Route
//token
router.get('/braintree/token',braintreeTokenController)

//payments 
router.post('/braintree/payment', protect , braintreePaymentsController )

module.exports = router