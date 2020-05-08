const express = require('express');
const router = express.Router();
const { signupValidator, signinValidator, validate } = require('../validator')
const { requireAuth, signupUser, signinUser, authHeader } = require('../middlewares/auth');

const { authToken, authCookie, signout } = require('../controllers/auth');

router.route('/api/signup')
    .post(signupValidator, validate, signupUser, authToken)

router.route('/api/signin')
    .post(signinValidator, validate, signinUser, authToken);

router.route('/api/signout')
    .get(signout)

router.route('/api/auth')
    // .get(authHeader, authCookie)
    .get(authHeader, authCookie)


module.exports = router