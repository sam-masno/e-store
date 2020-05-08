import axios from 'axios';


export const createOrder = async (userId, order, next) => {
    try {
        const res = await axios.post(`/api/order/create/${userId}`, order);
        console.log(res.data)
        return next(false, res.data);
    } catch (error) {
        return next(true, error.response.data.message);
    }
}

export const getOrders = async (status, page, next) => {
    try {
        const res = await axios.get(`/api/order/all?status=${status}&page=${page}`);
        return next(null, res.data)
    } catch (error) {
        return next(true, error.response.data.message);
    }
}

export const updateOrder = async (status, orderId, next) => {
    try {
        const res = await axios.put(`/api/order/update/${orderId}`, { status });
        return next(null, res.data);
    } catch (error) {
        return next(true, error.response.data.message);
    }
}

export const getPurchaseHistory = async (id, next) => {
    try {
        const res = await axios.get(`/api/order/all/${id}`);
        return next(null, res.data.data);
    } catch (error) {
        return next(true, error.response.data.message);
    }
}