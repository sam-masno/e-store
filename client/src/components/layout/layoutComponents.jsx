import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import connectCart from 'components/user/cart/connectCart';

export const GoBack = ({className}) => {
    const history = useHistory()
    return (
        <button className={`btn mb-2 ${className}`} onClick={(()=> history.goBack())}>Go Back</button>
    )
}

export const Success = ({message}) => {
    return (
        <div className="alert alert-success">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            { message }
        </div>
    )
}

export const Loading = ({message}) => {
    return (
        <div className="alert alert-info">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            { message }
        </div>
    )
}

export const Error = ({error}) => {
    return (
        <div className="alert alert-danger">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            { error }
        </div>
    )
}

const Add = ({cart, addItem, product }) => {
    const [count, setCount] = useState(null);
    useEffect(() => {
        let mnt = true;
        let current = cart.items.filter((item) => item._id === product._id);
        if(current.length && mnt) setCount(current[0].count)

        return () => mnt = false;
    },[cart.items] )

    const handleClick = () => {
        addItem(product)
    }
    return (
        <button className="btn btn-danger text-white" onClick={ handleClick }>
            {count && <span className="badge badge-warning pb-1 pt-1">{ count }</span> }
            <span className="fas fa-cart-plus"></span>
            Add
        </button>
    )
}

export const AddButton = connectCart(Add);

export const Spinner = ({color}) => (
    <div className={`spinner-grow text-${color} ` }role="status">
        <span className="sr-only">Loading...</span>
    </div>
)