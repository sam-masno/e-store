const Category = require('../models/category');
const Product = require('../models/product');
const { asyncHandler } = require('../helpers');

//create a new category
exports.create = asyncHandler( async (req, res, next) => {
    const { name } = req.body
    //check if name is included
    if(!name) throw new Error('Enter category name');
    //check if name already exists
    const exists = await Category.findOne({ name })
    if(exists) throw new Error('Category already exists');
    //create and return to user
    const category = await Category.create(req.body);
    return res.status(200).json({ data: category})
})

//update existing category
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { category } = req;
    const { name } = req.body;
    //check for name
    if(!name) throw new Error('No name included')
    category.name = name;
    const data = await category.save( { new: true } )
    return res.status(200).json({ data })
})

//delete an existing category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    await req.category.delete();
    return res.status(200).json({message: 'Category deleted'})
})

exports.categoryProducts = asyncHandler(async (req, res, next) => {
    const data = await Product.find({category: req.params.categoryId})  ;
    return res.status(200).json({ data })
})

exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const data = await Category.find()
    res.status(200).json({ data })
})

exports.getSingleCategory = asyncHandler((req, res, next) => {
    return res.status(200).send({ data: req.category } )
})