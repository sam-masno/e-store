import { API_ROUTE } from 'config';
import axios from 'axios';

export const addProduct = async (formData, callback) => {
    try {
        const res = await axios.post(`${API_ROUTE}/api/product/create`, formData )
        return callback(null, `${res.data.data.name} has been added`)
    } catch (error) {
        return callback(true, `Error: ${error.response.data.message}`)
    }
}

export const updateProduct = async (formData, id, callback) => {
    try {
        const res = await axios.put(`${API_ROUTE}/api/product/update/${id}`, formData )
        return callback(null, res.data.data)
    } catch (error) {
        return callback(true, `Error: ${error.response.data.message}`)
    }
}

export const getProducts = async (query, next) => {
    try {
        const res = await axios.get(`${API_ROUTE}/api/product/search?sortBy=${query[0]}&order=${query[1]}&limit=3`)
        return next(null, res.data.data)
    } catch (error) {
        return next(true, 'There was an error getting products')
    }
}

export const getProduct = async (id, next) => {
    try {
        const res = await axios.get(`${API_ROUTE}/api/product/read/${id}`)
        return next(null, res.data.data)
    } catch (error) {
        return next(true, 'There was an error, please try again')
    }
}

export const getImage = async (id, url, next) => {
    // converts buffer array to base64
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    try {
        const res = await axios.get(`${API_ROUTE}/api/${url}/photo/${id}`)
        const img = `data:${res.data.photo.contentType};base64, ${arrayBufferToBase64(res.data.photo.data.data)}`
        return next(null, img)
    } catch (error) {
        return next(true, error.response.data.message)
    }
}

export const getSimilarProducts = async (id, next) => {
    try {
        const res = await axios.get(`${API_ROUTE}/api/product/similar/${id}`);
        return next(null, res.data.data)
    } catch (error) {
        return next(true, error.response.data.message)
    }
}

export const deleteProduct = async (id, next) => {
    try {
        const res = await axios.delete(`${API_ROUTE}/api/product/delete/${id}`);
        return next(null, 'Product removed')
    } catch (error) {
        return next(true, error.response.data.message)
    }
}


