const express = require('express');
const router = express.Router();

//CONTROLLERS   
const { createProduct, 
    updateProduct, 
    deleteProduct, 
    readProduct,
    viewProduct,
    getAllProducts,
    getSimilarProducts,
    listCategories,
    productPhoto,
    listBySearch
} = require('../controllers/productController');

//MIDDLEWARES
const { requireAuth, adminOnly } = require('../middlewares/auth');
const { findUserProfile } = require('../middlewares/userMiddlewares');
const { getProduct } = require('../middlewares/productMiddlewares');

//ROUTES
router.route('/api/product/create')
    .post(requireAuth, adminOnly, createProduct)

router.route('/api/product/update/:productId')
    .put(requireAuth, adminOnly, updateProduct)

router.route('/api/product/delete/:productId')
    .delete(requireAuth, adminOnly, deleteProduct);

router.route('/api/product/read/:productId')
    .get(readProduct);

router.route('/api/product/view/:productId')
    .get(viewProduct);

router.route('/api/product/search')
    .get(getAllProducts)

router.route('/api/product/similar/:productId')
    .get(getSimilarProducts)

router.route('/api/product/categories')
    .get(listCategories)

router.route('/api/product/filter')
    .post(listBySearch)

router.route('/api/product/photo/:productId')
    .get(productPhoto)

router.param('productId', getProduct);
router.param('userId', findUserProfile);

module.exports = router;