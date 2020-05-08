const User = require('../models/user');
const jwt = require('jsonwebtoken');//gen token
const { sendError } = require('../helpers');

//@ /api/signin /api/signup
// access public
// return cookie with jwt and user info(signToken at bottom)
exports.authToken  = async (req, res, next ) => {
    const{ user } = req
    const { _id, name, email, role } = user;
    try {
        const token = await jwt.sign({_id, role}, require('../config/keys').jwtSecret);
        res.cookie('t', token, { expire: new Date() + 80000 });
        res.status(200).send({token, user: { _id, name, email, role }})
    } catch (error) {
        return sendError(400, 'There was an error', next)
    }
    
}

//@route /api/auth
//access public with token
//check localStorage token and return cookies
exports.authCookie = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);
        if(!user) return sendError(404, 'User not found', next)
        const { _id, name, email, role } = user;
        res.cookie('t', req.auth, { expire: new Date() + 80000 });
        res.status(200).json({ user: { _id, name, email, role } })
    } catch (error) {
        return sendError(500, 'Server error', next)
    }
    
}

//@route /api/signout
//access public
//log out user and return empty cookie
exports.signout = (req, res) => {
    // clear cookie entry by name
    res.clearCookie('t');
    return res.json({message: 'You have been signed out succesfully.'})
}

