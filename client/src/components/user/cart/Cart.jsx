import React, { useState, useEffect,Fragment } from 'react';

import { Link } from 'react-router-dom';

import connectCart from 'components/user/cart/connectCart';
import requireAuth from 'components/auth/HOCs/requireAuth';
import { getProduct } from 'services/products';

const Cart = ({ cart: { items, total, count } }) => {
    return (
        <div className="card mb-5 col-12 col-md-8 px-0 mx-auto mt-5">
            <div className="card-header">
                <h3 className="card-title text-danger"> 
                    <span className="fas fa-shopping-cart text-danger"></span>
                    {' '}
                    Cart
                </h3>
            </div>
            <div className="card-content">
                    { 
                        !items.length && (<h5 className="text-center my-5">
                        Nothing in cart. Head to <Link to="/">Shop</Link>
                        </h5>)
                    }


                <ul className="list-group">
                    

                    { items.map((item, i) => (
                            <CartItem key={i} item={item} />
                              
                        
                    ))}
                    { count !== 0 && (
                            <Fragment>
                                <li className="list-group-item">
                                    <h5>Total: ${ total } </h5>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/checkout" className="btn btn-danger btn-lg btn-block"> 
                                        <span className="fas fa-check"></span>
                                        Checkout 
                                    </Link>
                                </li>
                                    <ClearCart />
                            </Fragment>

                        )
                    }
                </ul>
            </div>
        </div>
    );
}

const CartItem = connectCart(({ item, addItem, removeItem }) => {
    
    const handleAdd = () => {
        addItem( item )
    }
    const handleRemove = () => {
        removeItem( item._id )
    }

    // const { name, price,}

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <div className="">
                    <Link to={`/product/view/${item._id}`} className=""> 
                        <h4>{ item.name }</h4>
                    </Link>
                    <p>${ item.price }</p> 
                </div>
                <div>
                    <button className="btn btn-danger mr-2 lead" onClick={handleRemove}> - </button>
                        { item.count }
                    <button className="btn btn-success ml-2" onClick={handleAdd}> + </button>
                </div>
            </div>
            
        </li>
    )
})

const ClearCart = connectCart(({clearItems}) => (
    <li className="list-group-item">
        <button type="button" className="btn btn-warning btn-lg btn-block" onClick={clearItems} >
            <span className="fas fa-trash text-white"></span>
            {' '}
            Clear Cart
        </button>    

    </li>
))

export default requireAuth(connectCart(Cart));
