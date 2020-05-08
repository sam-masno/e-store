const express = require('express');
const router = express.Router();
const { findUserProfile } = require('../middlewares/userMiddlewares');
const { requireAuth, adminOnly, isAuth} = require('../middlewares/auth');
const { userProfile, updateProfile } = require('../controllers/userController');


router.route('/api/user/:userId/update')
    .put(requireAuth, isAuth, updateProfile);

router.route('/api/user/profile/:userId')
    .get(requireAuth, userProfile);

router.param('userId', findUserProfile);

module.exports = router