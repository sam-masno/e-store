module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    BTmerchantId: process.env.BT_MERCHANT_ID,
    BTprivateKey: process.env.BT_PRIVATE_KEY,
    BTpublicKey: process.env.BT_PUBLIC_KEY,
    bucket: process.env.AWS_BUCKET
}