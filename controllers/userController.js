const { checkEmail, checkPassword } = require('../validator');
const { asyncHandler } = require('../helpers');

exports.userProfile = (req, res, next) => {
    return res.json({user: req.profile})
}

exports.updateProfile = asyncHandler(async (req, res, next) => {
    let { profile } = req;
    const { email, password } = req.body
    const updateFields = ['name', 'about', 'email', 'password']

    if(email && !checkEmail(email)) throw new Error('Email invalid')
    if(password && !checkPassword(password)) throw new Error('Password not valid')
    //check if field is in approved updates and is defined
    for (let field in req.body) {
        if(updateFields.includes(field) && field ) profile[field] = req.body[field]
    }

    const data = await profile.save((err, update) => {
        if(err) return sendError(400, "There was an error", next)
        update.password = undefined
        return res.json({ data: update })
    })
    res.status(200).json({data})
})