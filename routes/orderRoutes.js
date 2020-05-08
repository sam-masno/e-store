const express = require('express');
const router = express.Router();

//controllers
const { createOrder, getOrders, deleteOrder, updateOrder, getUserOrders } = require('../controllers/orderController');

//middlewares
const { requireAuth, isAuth, adminOnly } = require('../middlewares/auth');
const { findUserProfile } = require('../middlewares/userMiddlewares');
const { findOrder } = require('../middlewares/orderMiddlewares');


//create a new order
router.route('/api/order/create/:userId')
    .post(requireAuth, isAuth, createOrder)

//get users orders to display in dashboard
router.route('/api/order/all/:userId')
    .get(requireAuth, isAuth, getUserOrders)

// get all orders for admin
router.route('/api/order/all')
    .get(requireAuth, adminOnly, getOrders)

//delete an order
router.route('/api/order/delete/:orderId')
    .delete(requireAuth, adminOnly, deleteOrder)

//admin update order
router.route('/api/order/update/:orderId')
    .put(requireAuth, adminOnly, updateOrder)

router.param('userId', findUserProfile);
router.param('orderId', findOrder);

module.exports = router;