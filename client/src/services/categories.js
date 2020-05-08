import axios from 'axios';

export const addCategory = async (name, callback) => {
    try {
        const res = await axios.post(`/api/category/create`, { name })
        return callback(null, `${res.data.data.name} has been added`)
    } catch (error) {
        return callback(true, `Error: ${error.response.data.message}`)
    }
}

export const getCategories = async (next) => {
    try {
        const res = await axios.get(`/api/category/all`);
        return next(null, res.data.data)
    } catch (error) {
        return next(true, 'There was an error retrieving categories')
    }
}

export const browse = async (category, next) => {
    try {
        const products = await axios.get(`/api/category/products/${category}`)
        return next(null, products.data.data)
    } catch (error) {
        return next(true, error.response.data.message)
    }
}

export const updateCategory = async (id, name, next) => {
    try {
        const res = await axios.put(`/api/category/update/${id}`, { name });
        return next(null, 'Update successful')
    } catch (error) {
        return next(true, error.response.data.message)   
    }
}

export const deleteCategory = async (id, next) => {
    try {
        const res = await axios.delete(`/api/category/delete/${id}`);
        return next(null, 'Update successful')
    } catch (error) {
        return next(true, error.response.data.message)   
    }
}