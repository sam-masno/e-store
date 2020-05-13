const bt = require('braintree');
const keys = require('../config/keys');
const { sendError } = require('../helpers');

const gateway = bt.connect({
    environment: bt.Environment.Sandbox,
    merchantId: keys.BTmerchantId,
    publicKey: keys.BTpublicKey,
    privateKey: keys.BTprivateKey
  });

  //BT PAYMENT FLOW
//   CREATE GATEWAY WITH BT.CONNECT({OPTIONS})
// CLIENT CONTACTS BACKEND AND BACKEND SENDS BACK TOKEN(GENERATETOKEN)
//CLIENT USES TOKEN TO INIT DROPIN. INSTANCE. ON PAYMENT ATTEMPT GETS NONCE
// CLIENT SENDS NONCE AND AMOUNT TO BACKEND
//BACKEND HANDLES PAYMENT WITH gateway.transaction.sale({options, callback})

exports.generateToken = (req, res, next) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err) return sendError(500, 'Server error', next)
        return res.json(response.clientToken)
    })
}

exports.processPayment = async (req, res, next) => {
    let clientNonce = req.body.paymentMethodNonce;
    let amountFromClient = req.body.amount;

    gateway.transaction.sale({
        paymentMethodNonce: clientNonce,
        amount: amountFromClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if(err) return sendError(500, 'Payment error', next);
        res.json(result)
    })
}