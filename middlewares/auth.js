const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendError } = require('../helpers')

const checkToken = token => jwt.verify(token, require('../config/keys').jwtSecret);

//ensure req contains jwt, pass on req.auth
// @all protected routes
exports.requireAuth = (req, res, next) => {
    if(!req.headers.authorization) return next(sendError(403, 'Access denied'))
    if(!req.headers.authorization.includes('Bearer')) return next(sendError(403, 'Access denied'))
    const [bearer, token] = req.headers.authorization.split(' ');
    if(!token || bearer !== 'Bearer') next(sendError(403, 'Access denied'));
    try {
        const auth = checkToken(token);
        req.auth = auth;
        next();
    } catch(error) {
        next(error)
    }
}

//ensure req.auth is role 1 (admin role);
//@admin only protected routes
exports.adminOnly = (req, res, next) => {
    if(req.auth.role !== 1) next(sendError(403, 'Admin Resource', next));
    next()
}

// check if email exists in database and pass on user in req.user to receive token
// @public
exports.signupUser = async (req, res, next) => {
        //check if email in use
        const { email } = req.body;
        //create and return new user
        try {
            const exists = await User.findOne({ email })
            if(exists) {
                next(sendError(422, 'Email already in use', next))
            }
            const user = await User.create(req.body);
            req.user = user
            next();
        } catch (error) {
           next(error)
        }
        
}

//allow through by match req email and password, pass on user to getToken
//@public
exports.signinUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if(!user) next(sendError(404, 'User not found.')); 
 
        user.compare(password, async (err, isMatch) => {
            if(err) next(err);
            if(!isMatch) next(new Error('Incorrect password'));          
            req.user = user;
            next();
        })   
    } catch (error) {
        next(error);
    }
}

//used for updating profile info.
//match auth to profile and allow admin thru
// @at routes that require matching user to given profile like updates
exports.isAuth = (req, res, next) => {
    const user = req.profile && req.auth && req.auth._id == req.profile._id;
    if(!user && req.auth.role != 1 ) next( sendError( 403, 'Access denied' ) );
    next();
}

exports.authHeader = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token || token.split(' ')[0] !== 'Bearer') next( sendError(403, 'Access denied' ) );
    try {
        const auth = checkToken(token.split(' ')[1]);
        req.auth = auth;
        next();
    } catch(error) {
        next(error)
    }
}
