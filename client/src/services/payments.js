import axios from 'axios';

// BT FLOW:
// INIT DROPIN IF ITEMS IN CART BY GETTING BT TOKEN FROM BACKEND FOR AUTH, THEN STORING INSTANCE
//GET PAYMENT METHOD NONCE FROM INSTANCE USING instance.requestPaymentMethod();
//SEND PAYMENT NONCE AND AMOUNT TO BACKEND, HANDLE IN CALLBACK
export const getPaymentToken = async (userId, next) => {
    try {
        const token = await axios.get(`/api/pay/token/${userId}`);
        return next(false, token.data)
    } catch (error) {
        if(error.response) return next(error.response.data.messsage);
        return next(true, 'There was an error')
    }
}

export const sendPayment = async (id, nonce, amount, next) => {
    try {
        const res = await  axios.post(`/api/pay/submit/${id}`, { paymentMethodNonce: nonce, amount });
        return next(false, res.data)
    } catch (error) {
        if(error.response.data.message) return next(error.response.data.messsage);
        return next(true, 'There was an error')
    }
}