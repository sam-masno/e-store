const fs = require('fs');
const Product = require('../models/product');
const _ = require('lodash');
const { sendError, asyncHandler } = require('../helpers');

//create new product
// @/api/product/create
//@access admin only
exports.createProduct = asyncHandler(async (req, res, next) => {
    const exists = await Product.findOne({ name: req.body.name, category: req.body.category})
    if(exists) throw new Error('Product name already exists in that category')
    const product = await Product.create(req.body)
    res.json(product)
});


//update existing product
// @/api/product/update/:productId
//@access admin only
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { product } = req;
    // res.json({data: product}
    const data = await Product.findByIdAndUpdate(product._id, req.body, { new: true } )
    res.json({data})
})

//create new product
// @/api/product/delete/:productId
//@access admin only
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    await req.product.remove()
    res.json({message: 'Product deleted'})
})

exports.readProduct = (req, res) => {
    res.status(200).json({data: req.product});
}

// exports.viewProduct = asyncHandler(async (req, res) => {
//     const { product } = req;
//     const getPhoto = await Product.findById(product._id).select('photo');
//     // getPhoto.json(photo)
//     product.photo.data = getPhoto.photo.data;
//     product.photo.contentType = getPhoto.photo.contentType;
//     return res.status(200).json({data: product })

// })

//get all products with simple queries
//@/api/product/search
//@access public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
    let { order, sortBy, limit, page } = req.query;
    order = order ? order : -1;
    sortBy = sortBy ? sortBy : 'createdAt';
    limit = limit ? parseInt(limit) : 9;
    page = page ? parseInt(page) : 1;
    let skip = page ? (page - 1) * limit : 0;

    Product.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .exec((err, products) => {
            if(err) return sendError(500, 'Server Error', next);
            return res.json({data: products})
        })
})

//get other products in same category
// @/api/product/similar/:productId
//@access public
module.exports.getSimilarProducts = asyncHandler(async (req, res, next) => {
    const { category } = req.product;
    // res.send(category)
        const data = await Product.find({ _id: {$ne: req.product},  category })
            .select('-photo')
            .populate('category', '_id name')
            .limit(3)
            .sort([['price', 1]])
        return res.status(200).json({ data })
})

//return a list of all categories associated to a product
exports.listCategories = asyncHandler(async (req, res, next) => {
        const categories = await Product.distinct('category')
        return res.status(200).json({data: categories})
})

 
// route - make sure its post

 
exports.listBySearch = asyncHandler((req, res, next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            return res.json({
                size: data.length,
                data
            });
        });
});



