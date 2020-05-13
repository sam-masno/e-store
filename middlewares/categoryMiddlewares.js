const Category = require('../models/category');
const { sendError } = require('../helpers');


exports.categoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id);
        if(!category) next(sendError(404, 'Category not found'));
        req.category = category;
        next();
    } catch (error) {
        next(sendError(400,'Error',next))
    }
}