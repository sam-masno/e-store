const { checkEmail, checkPassword } = require('../validator');
const { sendError } = require('../helpers');

exports.userProfile = (req, res, next) => {
    return res.json({user: req.profile})
}

exports.updateProfile = (req, res, next) => {
    let { profile } = req;
    const { email, password } = req.body
    const updateFields = ['name', 'about', 'email', 'password']

    if(email && !checkEmail(email)) return sendError(422, 'Email invalid', next)
    if(password && !checkPassword(password)) return sendError(422, 'Password not valid', next)
    //check if field is in approved updates and is defined
    for (let field in req.body) {
        if(updateFields.includes(field) && field ) profile[field] = req.body[field]
    }

    profile.save((err, update) => {
        if(err) return sendError(400, "There was an error", next)
        update.password = undefined
        return res.json({ data: update })
    })

}