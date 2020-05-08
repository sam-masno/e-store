import { AUTH, USER, SIGNOUT, SET_ITEMS, ADD_ITEM, REMOVE_ITEM, REMOVE_ALL_ITEM, CLEAR_ITEMS } from 'actions/types';

export const setAuth = value => {
    return { type: AUTH, payload: value }
}

export const setUser = user => {
    return { type: USER, payload: user }
}

export const userSignout = () => {
    return { type: SIGNOUT }
}

export const setItems = (cart) => {
    return {type: SET_ITEMS, payload: cart }   
}

export const addItem = (product) => {
    return {type: ADD_ITEM, payload: product}
}

export const removeItem = (id) => {
    return {type: REMOVE_ITEM, payload: id}
}

export const removeAllItem = (id) => {
    return {type: REMOVE_ALL_ITEM, payload: id}
}

export const clearItems = () => {
    return { type: CLEAR_ITEMS }
}