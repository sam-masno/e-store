const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
// const uuidv1 = require('uuidv1')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true, 
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 32

    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10, ((err, salt) => {
        if(err) return next(err)
        return salt
    }));
    
    // this.password = await bcrypt.hash(this.password, salt)
    bcrypt.hash(this.password, salt, null, (err, hash) => {
        if(err) return next(err)
        this.password = hash;
        next()
    })
    next();
})

userSchema.methods.compare = function (plainText, callback) {
    return  bcrypt.compare(plainText, this.password, (err, isMatch) => {
        if(err) callback(err);
        callback(null, isMatch);        
    })
}

const User = mongoose.model('user', userSchema);

module.exports = User;