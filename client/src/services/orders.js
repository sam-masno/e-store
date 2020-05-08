import { API_ROUTE } from 'config';
import axios from 'axios';


export const createOrder = async (userId, order, next) => {
    try {
        const res = await axios.post(`${API_ROUTE}/api/order/create/${userId}`, order);
        console.log(res.data)
        return next(false, res.data);
    } catch (error) {
        return next(true, error.response.data.message);
    }
}

export const getOrders = async (status, page, next) => {
    try {
        const res = await axios.get(`${API_ROUTE}/api/order/all?status=${status}&page=${page}`);
        return next(null, res.data)
    } catch (error) {
        return next(true, error.response.data.message);
    }
}

export const updateOrder = async (status, orderId, next) => {
    try {
        const res = await axios.put(`${API_ROUTE}/api/order/update/${orderId}`, { status });
        return next(null, res.data);
    } catch (error) {
        return next(true, error.response.data.message);
    }
}

export const getPurchaseHistory = async (id, next) => {
    try {
        const res = await axios.get(`${API_ROUTE}/api/order/all/${id}`);
        return next(null, res.data.data);
    } catch (error) {
        return next(true, error.response.data.message);
    }
}