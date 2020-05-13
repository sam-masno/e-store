const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 32
        },
        description: {
            type: String,
            require: true,
            maxLength: 2000
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        sold: {
            type: Number,
            default: 0
        },
        category: {
            type: ObjectId,
            ref: 'category',
            required: true
        },
        quantity: {
            type: Number
        },
        photo: {
            type: String,
            default: 'no-photo.jpeg'
        }

    },
    { timestamps: true }
)

const Product = mongoose.model('product', productSchema);

module.exports = Product;