
const productModel = require("../models/productModel");
const slugify = require('slugify')
const braintree = require('braintree');
const orderModel = require("../models/orderModel");
const env = require('dotenv');


env.config()


//payment Gateway implementation
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



const createProductController = async (req,res) =>{
    try {
        const {name,description,price,category,quantity,shipping} = req.body

        const products = new productModel({
        name,
        description,
        price,
        category,
        quantity,
        slug:slugify(name),
        photo:req.file.filename}) ;
       
      await products.save();

      return res.status(200).send({
        success:true,
        message: 'Product created successfully',
        products
      })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message:"Something went wrong",
            error
        })
    }
}

const fetchAllProducts = async(req,res) =>{
  try {
    const allProducts = await productModel.find({}).limit(12).sort({createdAt:-1})
    return res.status(200).send({
      success:true,
      count:allProducts.length,
      message:"Products Fetched",
      allProducts
    })
  } catch (error) {
    console.log(error);
        return res.status(500).send({
            success: false,
            message:"Something went wrong",
            error
        })
  }
}

const getAProduct = async(req,res) =>{
  try {
    const {slug} = req.params

    const fetchedProduct = await productModel.findOne({slug})
    return res.status(200).send({
      success:true,
      message:"Product Fetched",
      fetchedProduct
    })
  } catch (error) {
    console.log(error);
        return res.status(500).send({
            success: false,
            message:"Something went wrong",
            error
        })
  }
}

const deleteAProduct = async(req,res) =>{
  const {id} = req.params.id;
  try {
    await productModel.findOneAndDelete({id})
    return res.status(200).send({
      success: true,
      message:"Product deleted successfully"
    })
  } catch (error) {
    console.log(error);
        return res.status(500).send({
            success: false,
            message:"Something went wrong",
            error
        })
  }
}

const updateProductController = async (req,res) =>{
  try {
    const {name,description,price,category,quantity,shipping} = req.body
    
    const products = await productModel.findByIdAndUpdate(req.params.id,
      {
        name,
        slug: slugify(name),
        description,
        price,
        category,
        quantity,
        // photo:req.file.filename,
      },
      {new:true} 
  )

  return res.status(200).send({
    success:true,
    message: 'Product updated successfully',
    products
  })
} catch (error) {
    console.log(error);
    return res.status(500).send({
        success: false,
        message:"Something went wrong",
        error
    })
}
}

const productFilterController = async (req,res) =>{
  try {
    const {checked, radio} = req.body
    console.log(req.body);
    let args = {}
    if(checked.length > 0) args.category = checked
    if(radio.length ) args.price = { $gte: radio[0] , $lte : radio[1] }
    const products = await productModel.find(args)
    console.log(args);
    console.log(products);
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
        success: false,
        message:"Something went wrong",
        error
    })
  }
}

const productCountController = async(req,res) =>{
  try {
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
      success:true,
      total
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:"Something went wrong",
      error
  })
  }
}

const productListController = async (req,res) =>{
  try {
    const perPage = 6
    const page = req.params.page ? req.params.page : 1
    const products = await productModel.find({}).skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:"Something went wrong",
      error
  })
  }
}

const searchController = async (req,res) =>{
  try {
    const {keyword} = req.params
    const result = await productModel.find({
      $or:[
        {name:{$regex: keyword, $options: "i"}},
        { description:{ $regex:keyword, $options: "i"}}
      ]
    })
    res.json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:"Something went wrong",
      error
  })
  }
}

const realtedProductController = async (req,res) =>{
  try {
    const {pid,cid} = req.params
    const products = await productModel.find({
      category:cid,
      _id:{$ne:pid}
    }).limit(3).populate("category")
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:"Something went wrong",
      error
  })
  }
}


//payment Gateway api
const braintreeTokenController = async (req,res) =>{
  try {
    gateway.clientToken.generate({}, function (err, response){
      if(err){
        res.status(500).send(err)
      }else{
        res.send(response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}


//payment
const braintreePaymentsController = async (req,res) =>{
  try {
    const {cart , nonce} = req.body
    let total = 0
    cart.forEach(data =>{
      const price = parseFloat(data.price)

      if(!isNaN(price)){
          total += price
      }
  });
   let newTransaction = gateway.transaction.sale({
    amount:total,
    paymentMethodNonce: nonce,
    options:{
      submitForSettlement: true,
    }
   },
   function(error,result){
    if(result){
      const order = new orderModel({
        products: cart,
        payment: result,
        buyer: req.user._id
      }).save()
      res.json({ok:true})
    }else{
      res.status(500).send(error)
    }
   }
   )
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createProductController,
  fetchAllProducts,
  getAProduct,
  deleteAProduct,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchController,
  realtedProductController,
  braintreeTokenController ,
  braintreePaymentsController
}