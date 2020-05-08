const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true,
        unique: true
    }
},
    { timestamps: true }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category; 