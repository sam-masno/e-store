const fs = require('fs');
const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const { sendError } = require('../helpers');

//create new product
// @/api/product/create
//@access admin only
exports.createProduct = (req, res, next) => {
    const form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        if(err) res.status(400).json({ error: 'Image could not be uploaded'});

        let product = new Product(fields);

        const { name, description, price, quantity, category } = fields;

        if(!name || !description || !price || !quantity || !category) {
            return sendError(422, 'Enter all required fields', next);
        }

        if(files.photo){

            if(files.photo.size > 1000000) {
                return sendError(422, 'Image must be less than 1mb', next);
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        } 

        product.save((err, result) => {
            if(err) return sendError(400, 'Error. Please try again', next)
            res.json({ data : result })
        })
    })
};


//create new product
// @/api/product/update/:productId
//@access admin only
exports.updateProduct = async (req, res, next) => {

    const { product } = req;
    // res.json({data: product})
    const form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) res.status(400).json({ error: 'Image could not be uploaded'});
        
        //check for form fields and update product
        Object.keys(fields).forEach(fieldname => {
            if(fields[fieldname]) product[fieldname] = fields[fieldname];
        })
        
        // res.json({data: product})

        if(files.photo){

            if(files.photo.size > 1000000) {
                return sendError(422, 'Image must be less than 1mb', next);
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        } 

        product.save((err, result) => {
            if(err) return sendError(400, 'Error. Please try again', next)
            res.json({ data : result })
        })
    })
}

//create new product
// @/api/product/delete/:productId
//@access admin only
exports.deleteProduct = async (req, res, next) => {
    try {
        await req.product.remove()
        res.json({message: 'Product deleted'})
    } catch (error) {
        return sendError(400, 'Error', next);
    }
}

exports.readProduct = (req, res) => {
    res.status(200).json({data: req.product});
}

exports.viewProduct = async (req, res) => {
    const { product } = req;
    const getPhoto = await Product.findById(product._id).select('photo');
    // getPhoto.json(photo)
    product.photo.data = getPhoto.photo.data;
    product.photo.contentType = getPhoto.photo.contentType;
    return res.status(200).json({data: product })

}

//get all products with simple queries
//@/api/product/search
//@access public
exports.getAllProducts = async (req, res, next) => {
    let { order, sortBy, limit, page } = req.query;
    order = order ? order : -1;
    sortBy = sortBy ? sortBy : 'createdAt';
    limit = limit ? parseInt(limit) : 9;
    page = page ? parseInt(page) : 1;
    let skip = page ? (page - 1) * limit : 0;

    Product.find()
        .select('-photo')
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .exec((err, products) => {
            if(err) return sendError(500, 'Server Error', next);
            return res.json({data: products})
        })
}

//get other products in same category
// @/api/product/similar/:productId
//@access public
module.exports.getSimilarProducts = async (req, res, next) => {
    const { category } = req.product;
    // res.send(category)
    try {
        const similarProducts = await Product.find({ _id: {$ne: req.product},  category })
            .select('-photo')
            .populate('category', '_id name')
            .limit(3)
            .sort([['price', 1]])
        if(!similarProducts.length) return res.status(404).json({ error: 'No products' })
        return res.status(200).json({ data : similarProducts })
    } catch (error) {
        return sendError(500, 'Server error', next)
    }
}

exports.listCategories = async (req, res, next) => {
    try {
        const categories = await Product.distinct('category')
        if(!categories) return sendError(404, 'Category not found', next)
        return res.status(200).json({data: categories})
    } catch (error) {
        return sendError(500, 'Server error', next)
    }
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
// route - make sure its post

 
exports.listBySearch = (req, res, next) => {
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
        .select("-photo")
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
};

exports.productPhoto = async (req, res, next) => {
    try {
        const photo = await Product.findById(req.product._id).select('photo');
        if(!photo) return sendError(404, 'Photo not found', next)
        return res.status(200).json(photo)
    } catch (error) {
        return sendError(400, 'Error', next)
    }
}