const { Order } = require('../models/order');
const { sendError } = require('../helpers');

exports.findOrder = async (req, res, next, orderId) => {
    try {
        const order = await Order.findById(orderId);
        if(!order) next(sendError(400, 'Order not found', next));
        req.order = order;
        next()
    } catch (error) {
        next(sendError(500, 'Server error'));
    }
}