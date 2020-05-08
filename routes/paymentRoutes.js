const express = require('express');
const router = express.Router();

//controllers
const { generateToken, processPayment } = require('../controllers/paymentController');

//middlewares
const { requireAuth, isAuth } = require('../middlewares/auth');
const { findUserProfile } = require('../middlewares/userMiddlewares');

router.route('/api/pay/token/:userId')
    .get(requireAuth, isAuth, generateToken)

router.route('/api/pay/submit/:userId')
    .post(requireAuth, isAuth, processPayment)

router.param('userId', findUserProfile)
module.exports = router;
