const Category = require('../models/category');
const { sendError } = require('../helpers');


exports.categoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id);
        if(!category) return sendError(404, 'Category not found', next);
        req.category = category;
        next();
    } catch (error) {
        return sendError(400,'Error',next)
    }
}