const express = require('express');
const router = express.Router();

//CONTROLLERS
const { 
    create, 
    updateCategory, 
    deleteCategory, 
    getAllCategories,
    getSingleCategory,
    categoryProducts 
} = require('../controllers/categoryController');

//MIDDLEWARES
const { adminOnly, requireAuth, isAuth } = require('../middlewares/auth')
const { categoryById } = require('../middlewares/categoryMiddlewares');

router.route('/api/category/all')
    .get(
        // requireAuth, 
        getAllCategories)

router.route('/api/category/create')
    .post(requireAuth, adminOnly, create)

router.route('/api/category/delete/:categoryId')
    .delete(requireAuth, adminOnly, deleteCategory)

router.route('/api/category/update/:categoryId')
    .put(requireAuth, adminOnly, updateCategory)

router.route('/api/category/single/:categoryId')
    .get(requireAuth, getSingleCategory)

router.route('/api/category/products/:categoryId')
    .get(categoryProducts)

router.param('categoryId', categoryById)
module.exports = router