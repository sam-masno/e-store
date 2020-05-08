import React, { useState, useEffect, Fragment } from 'react';

import { Link } from 'react-router-dom';

//braintree
import Dropin from 'braintree-web-drop-in-react';

//HOC
import requireAuth from 'components/auth/HOCs/requireAuth';
import connectCart from 'components/user/cart/connectCart';

import { getPaymentToken, sendPayment } from 'services/payments';
import { createOrder } from 'services/orders';


const defaultState = { success: false, clientToken: null,instance: {}, address: ''}

const Checkout = (
    { cart:{ items, total, count }, 
    user: { _id },
    clearItems
    },
) => {
    const [error, setError] = useState(null)
    const [data, setData] = useState(defaultState)
    const { success, clientToken, address, instance} = data;

    //retrieve payment token from server
    useEffect(() => {
        let mnt = true;
        getPaymentToken(_id, (err, result) => {
            if(mnt) {
                if(err) return setError(result)
                return setData({ ...data, clientToken: result })
            }
        })
        return () => mnt = false;
    }, [])

    const handlePay = async () => {
        if(address.length < 5) return setError('Please enter valid address')
        setError(null)
        const { nonce } = await instance.requestPaymentMethod();
        sendPayment(_id, nonce, total, (err, result) => {
            if(err) return setError(result)
            // console.log(result)
            if(result.success) {
                //if payment successful create and save order
                setData({ ...data, success: true });
                const order = { items, total, count, transaction_id: result.transaction.id, address}
                createOrder(_id, order, (err, result) => {
                    if(err) return setError(result);
                })
                clearItems()
            } else (
                setError('Payment unsuccessful')
            )

        })
    }

    return (
        <Fragment>
            {/* show cart total and item count */}
        <div className="container py-5">
            <div className="row">
                <div className="col-12 col-md-8 mx-auto">
                    { success && (
                        <Fragment>
                            <h3 className="text-primary">Payment successful!</h3>
                            <h5><Link to="/" >Back to Shop</Link></h5>
                        </Fragment>
                    )
                         }
                    <div className="card">
                        <div className="card-body">
                            <h3>Checkout</h3>
                            <ul className="list-group">

                                <li className="list-group-item lead">
                                    Items: { count }
                                </li>
                                <li className="list-group-item">
                                    Total: $ { total }
                                </li>
                                {items.length > 0 && !success ? (
                                    <li className="form-group list-group-item">
                                        <label htmlFor="address">Delivery address:</label>
                                        <textarea name="address" className='form-control' rows="5"
                                            onChange={ event => setData({...data, address: event.target.value})}
                                        ></textarea>
                                    </li> ): '' }
                                
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        {/* show payment dropin if items in cart */}
        { clientToken === null && <div className="container py-5"><h3 className="text-primary text-center">Please wait...</h3></div>  }
        { clientToken !== null && items.length > 0 ? (
                        <Fragment>
                            <div className="container pb-5">
                                <div className="row">
                                    <div className="col-md-8 col-12 mx-auto">
                                        {error && <h5 className="text-danger">{ error }</h5>}
                                        { success && <h5 className="text-success">Payment successful!</h5> }
                                        <Dropin 
                                            options={{ 
                                                authorization: clientToken
                                                // paypal: {
                                                //     flow: 'vault'
                                                // } //add for paypal method
                                            }}
                                            onInstance={ (instance) => setData({...data, instance }) }
                                        />
                                        <button className={`btn btn-primary btn-block btn-lg ${success ? 'd-none': ''}`} onClick={ handlePay }>Pay</button>

                                    </div>
                                </div>
                            </div>
                        </Fragment>
                        ): <Fragment></Fragment> 
                    }
        </Fragment>
    );
}

export default requireAuth( connectCart(Checkout) );
