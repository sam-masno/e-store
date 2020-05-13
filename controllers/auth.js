const User = require('../models/user');
const jwt = require('jsonwebtoken');//gen token
const { sendError, asyncHandler } = require('../helpers');

//@ /api/signin /api/signup
// access public
// return cookie with jwt and user info(signToken at bottom)
exports.authToken  = asyncHandler( async (req, res, next ) => {
    const{ user } = req
    const { _id, name, email, role } = user;
    const token = await jwt.sign({_id, role}, require('../config/keys').jwtSecret);
    res.cookie('t', token, { expire: new Date() + 80000 });
    res.status(200).send({token, user: { _id, name, email, role }})
})

//@route /api/auth
//access public with token
//check localStorage token and return cookies
exports.authCookie = async (req, res, next) => {
        const user = await User.findById(req.auth._id);
        if(!user)  throw new Error('User not found')
        const { _id, name, email, role } = user;
        res.cookie('t', req.auth, { expire: new Date() + 80000 });
        res.status(200).json({ user: { _id, name, email, role } })
}

//@route /api/signout
//access public
//log out user and return empty cookie
exports.signout = asyncHandler((req, res, next) => {
    // clear cookie entry by name
    res.clearCookie('t');
    return res.json({message: 'You have been signed out succesfully.'})
})

