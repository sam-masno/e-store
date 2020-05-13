require('dotenv').config();
const AWS = require('aws-sdk');
const { bucket } = require('../config/keys');
const { asyncHandler } = require('../helpers')

const s3 = new AWS.S3()

exports.uploadUrl = asyncHandler(async (req, res, next) => {
    //reformat name and extract type for key
    const name = req.body.product.split(' ').join('-');
    const type = req.body.type.split('/')[1];
    const key = `products/${name}.${type}`;

    //build params
    const params = {
            Bucket: bucket,
            ContentType: 'image/*',
            Key: key,
            Expires: 120
    }

    // get signed url and return to user
        const url = await s3.getSignedUrl('putObject', params);
        res.json({url})
})
