import { API_ROUTE } from 'config';
import axios from 'axios';

//singup new user
export const signup = async (info, callback) => {
    try {
        const res = await axios.post(`${API_ROUTE}/api/signup`, info)
        localStorage.setItem('token', res.data.token) 
        return callback(false, res.data.user)
    } catch (error) {
        return callback(error.response.data.message, null);
    }
    
}

//sign in existing user
export const signin = async (info, callback) => {
    try {
        const res = await axios.post(`${API_ROUTE}/api/signin`, info)
        localStorage.setItem('token', res.data.token) 
        return callback(false, res.data.user)
    } catch (error) {
        return callback(error.response.message, null);
    }
}

//logout user
export const signout = async (callback) => {
    localStorage.removeItem('token')
    try {
        await axios.get(`${API_ROUTE}/api/signout`)
        return callback(null, 'You have been signed out')
    } catch (error) {
        return callback(true, error.response.data.message);
    }
}

//find existing token and sign in user
export const signInToken = async (callback) => {
    try {
        const res = await axios.get(`${API_ROUTE}/api/auth`)
        return callback(true, res.data.user)
    } catch (error) {
        return callback(false, null)
    }
    
}