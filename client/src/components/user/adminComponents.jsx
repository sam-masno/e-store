import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPurchaseHistory } from 'services/orders';
import Order from 'components/admin/orders/Order';

export const CategoryLinks = () => (
    <div className="card mb-5">
        <div className="card-header">
            <h4 className="card-title">Categories</h4>
        </div>
        <div className="card-content">
            <ul className="list-group justify-content-center">
                <li className="list-group-item">
                    <Link to="/add/category" className="nav-link ">Add Category</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/update/category" className="nav-link ">Update Category</Link>
                </li>
            </ul>
        </div>
    </div>        
)

export const ProductLinks = () => (
    <div className="card mb-5">
        <div className="card-header">
            <h4 className="card-title">Products</h4>
        </div>
        <div className="card-content">
            <ul className="list-group justify-content-center">
                <li className="list-group-item">
                    <Link to="/add/product" className="nav-link ">Add Product</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/update/product" className="nav-link ">Update Product</Link>
                </li>
            </ul>
        </div>
        
    </div>        
)

export const AccountInformation = ({  name, email, about }) => (
    <div className="card mb-5 px-0 mx-auto">
        <div className="card-header">
            <h3 className="card-title">Account Information</h3>
        </div>
        <div className="card-content">
            <ul className="list-group">
                <li className="list-group-item">
                    Name: { name }
                </li>
                <li className="list-group-item">
                    Email: { email }
                </li>
                <li className="list-group-item">
                    About: { about }
                </li>
            </ul>
        </div>
    </div>
)

export const PurchaseHistory = ({ id }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('')
    useEffect(() => {
        let mnt = true;
        getPurchaseHistory(id, (err, result) => {
            if(!mnt) return 
            if(err) return setError(result);
            setOrders(result)
        })
        return () => mnt = false
    },[])
    return (
        <div className="card mb-5 px-0">
            <div className="card-header">
                <h3 className="card-title">Purchase history</h3>
                { error && <h4>{ error }</h4>}
            </div>
            <div className="card-content">
                <ul className="list-group">
                    { orders.map(order => (
                        <li key={ order._id} className="list-group-item">
                            <Order order={order}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}



export const OrdersLinks = () => (
    <div className="card mb-5">
        <div className="card-header">
            <h4 className="card-title">Orders</h4>
        </div>
        <div className="card-content">
            <ul className="list-group justify-content-center">
                <li className="list-group-item">
                    <Link to="/admin/orders" className="nav-link ">Manage Orders</Link>
                </li>                
            </ul>
        </div>
    </div>        
)