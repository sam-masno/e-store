const { sendError } = require('../helpers');
const User = require('../models/user');


exports.findUserProfile = async (req, res, next, id) => {
    // const { userId } = req.params
    try {
        const user = await User.findById(id).select('-password');  
        if(!user) next(sendError(404, 'User not found.', next));
        req.profile = user;
        next();
    } catch (error) {
        next(sendError(404, 'User not found.', next));
    }    
}