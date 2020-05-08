const Product = require('../models/product');
const { sendError } = require('../helpers');

//forward product info to endpoint
exports.getProduct = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id).select('-photo').populate('category');
        if(!product) return sendError(404, "Product not found", next);
        req.product = product;
        next();
    } catch (error) {
        return sendError(400, error.message, next); 
    }
    

}