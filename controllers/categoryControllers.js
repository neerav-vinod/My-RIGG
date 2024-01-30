const categoryModel = require('../models/categoryModel')
const slugify = require('slugify')

const createCategory = async(req,res) =>{
    try {
        const {name} = req.body

        if(!name){
            return res.status(404).send({
                success:false,
                message:"no name specified"
            })
        }

        const categoryName = await categoryModel.findOne({name})

        if(categoryName){
            return res.status(400).send({
                success:false,
                message:"category already exists"
            })
        }

        const createCategory = await categoryModel.create({name,slug:slugify(name)})
        res.status(200).send({
            success:true,
            message:"category created",
            createCategory
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error creating category",
            error
        })
    }
}

const updateCategory = async(req,res) =>{
    const {name} = req.body
    const {id} = req.params.id
    try {

        const category = await categoryModel.findOneAndUpdate({id},{name,slug:slugify(name)},{new:true})
        return res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error updating category",
            error
        })  
    }
}

const fetchAllCategories = async(req, res) => {
    try {
        const getAllCategories = await categoryModel.find()

        return res.status(200).send({
            success:true,
            message:"Category",
            getAllCategories
        })
    } catch (error) {
       console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error fetching category",
            error
        }) 
    }
}

const fetchACategory = async (req,res) =>{
   
    try {
      const fetchedCategory = await categoryModel.findOne({slug:req.params.slug}) 
      return res.status(200).send({
        success:true,
        message:"Category fetched successfully",
        fetchedCategory
      })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error fetching category",
            error
        })  
    }
}

const deleteCategory = async(req, res) => {
    const {id} = req.params.id;
    try {
        await categoryModel.deleteOne({id});
        return res.status(200).send({
            success:true,
            message:"Category deleted successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error fetching category",
            error
        })   
    }
}

module.exports = {
    createCategory,
    updateCategory,
    fetchAllCategories,
    fetchACategory,
    deleteCategory
}