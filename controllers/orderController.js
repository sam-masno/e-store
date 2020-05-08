const { Order, CartItem } = require('../models/order');

const { sendError } = require('../helpers');

exports.createOrder = async (req, res, next) => {
    if(!req.body) return sendError(422, 'No items present', next)
    // return res.send(req.body)

    //get pertinent values from req
    const { items, transaction_id, total, address } = req.body;
    const { profile } = req;

    //create products array to enter into order
    const products = items.map(({_id, name, price, count}) => {
        return new CartItem({
            product: _id,
            name,
            price,
            count 
        })
    })

    //create order
    const order = new Order({
        products,
        transaction_id,
        amount: total,
        address,
        user: profile._id
    }) 
    
    //init variable for saved order and user update
    let newOrder
    try {
        newOrder = await order.save();
    } catch (error) {
        return sendError(500, 'Server error', next)
    }
    
    try {
        profile.history = profile.history.concat(newOrder);
        await profile.save();
    } catch (error) {
        return sendError(500, 'Server error', next);   
    }

    res.json('Order saved')

};

exports.getOrders = async (req, res, next) => {
    let { order, sortBy, limit, page, status } = req.query;

    order = order ? order : 1;
    sortBy = sortBy ? sortBy : 'createdAt';
    limit = limit ? parseInt(limit) : 2;
    page = page ? parseInt(page) : 1;
    let skip = page ? (page - 1) * limit : 0;

    const total = await Order.count({status});

    Order.find({ status })
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .exec((err, orders) => {
            if(err) return sendError(500, 'Server Error', next);
            let nextPage = total > page * limit ? page + 1 : null;
            let previousPage = page > 1 ? page -1 : null;
            return res.json({data: orders, nextPage, previousPage, total})
        })
}

exports.deleteOrder = async (req, res, next) => {
    const { order } = req;
    try {
            await order.remove();
            return res.json(`Order #${req.params.orderId} deleted`)
    }
    catch (error) {
        return sendError(500, 'Server error', next)
    }
}

exports.updateOrder = async (req, res, next) => {

    const valid = ["Not processed", "Processing", "Shipped", "Delivered", "Canceled"] 

    const { order } = req;
    const { status } = req.body;

    //enum status update
    if(valid.includes(status)) {
        //save
        try {
            const update = await Order.findOneAndUpdate({_id: order._id }, { status }, { new: true })
            return res.json(update)
        } catch (error) {
            return sendError(500, 'Server error', next)   
        }
    }
    return sendError(422, 'Invalid update', next);
}

exports.getUserOrders = async (req, res, next) => {
    const { _id } = req.profile;
    try {
        const orders = await Order.find({ user: _id });
        return res.json({ data: orders })
    } catch (error) {
        return sendError(500, 'Server error', next)
    }
}
