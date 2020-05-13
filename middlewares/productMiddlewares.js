const Product = require('../models/product');
const { sendError } = require('../helpers');

//forward product info to endpoint
exports.getProduct = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id).populate('category');
        if(!product) next(sendError(404, "Product not found"));
        req.product = product;
        next();
    } catch (error) {
        next(error); 
    }
    

}
