const Category = require('../models/category');
const Product = require('../models/product');
const { sendError } = require('../helpers');

exports.create = async (req, res, next) => {
    const { name } = req.body

    if(!name) return sendError(422, 'Enter category name', next);
    const exists = await Category.findOne({ name })
    if(exists) return sendError(422, 'Category already exists', next);

    try {
        const category = await Category.create(req.body);
        return res.status(200).json({ data: category})
    } catch (error) {
        return sendError(400, 'There was an error', next)
    }
};

exports.updateCategory = async (req, res, next) => {

    const { category } = req
    Object.keys(req.body).forEach(field => {
        if(req.body[field]) category[field] = req.body[field];
    })

    category.save((err, result) => {
        if(err) res.status(400).json({error: 'There was an error'})
        return res.status(200).json({data: result})
    })
}

exports.deleteCategory = async (req, res, next) => {
    try {
        await req.category.delete();
        return res.status(200).json({message: 'Category deleted'})
    } catch (error) {
        return sendError(400, 'There was an error', next)
    }

}

exports.categoryProducts = async (req, res, next) => {
    try {
        const products = await Product.find({category: req.params.categoryId}).select('-photo');
        if(!products.length) return sendError(404, 'No products found', next)
        return res.status(200).json({data: products})
    } catch (error) {
        return sendError(500, 'Server Error', next)
    }
}

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.status(200).json({data: categories})
    } catch (error) {
        return sendError(400,"There was an error", next)
    }
}

exports.getSingleCategory = (req, res, next) => {
    return res.status(200).send({data: req.category})
}