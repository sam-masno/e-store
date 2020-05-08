const { check, validationResult } = require('express-validator');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passwordRegex = /^\S{6,}$/

exports.checkEmail = (email) => emailRegex.test(email);
exports.checkPassword = password => passwordRegex.test(password)

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors);
    }
    next()
}


exports.signupValidator = 
    [
        check('name', 'Name is required.')
            .notEmpty()
            .isLength({ min: 3, max: 32 })
            .withMessage('Name must be between 3 and 32 characters'),
        check('email', 'Must be a valid email.')
            .matches(emailRegex),
        check('password', 'Password is required.')
            .matches(passwordRegex)
            .withMessage('Password must be at least 6 characters and contain no spaces.')
    ]

exports.signinValidator = [
    check('email', 'Please enter a valid email.')
        .matches(emailRegex)
        .withMessage('Please check your email.'),
    check('password', 'Password is required.')
        .matches(passwordRegex)
        .withMessage('Password must be at least 6 characters and contain no spaces.')
]