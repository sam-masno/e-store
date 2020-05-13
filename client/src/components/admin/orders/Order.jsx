import React, { useEffect, useState, useRef, Fragment } from 'react';
import moment from 'moment';

import { updateOrder } from 'services/orders';
import statusFields from 'utils/statusFields';


const Order = (props) => {
    const statusSelect = useRef(null)
    const [order, setOrder] = useState(props.order);
    const { amount, status, _id, transaction_id, user, address, products, createdAt, updatedAt } = order
    const [message, setMessage] = useState({message: '', outcome: ''})

    const handleUpdate = () => {
        const { value } = statusSelect.current
        if(!value) return setMessage({message:'Choose a status', outcome: 'error'})

        updateOrder(statusSelect.current.value, _id, (err, result) => {
            if(err) return setMessage({message: 'There was an error', outcome: 'error'});
            setMessage({message: 'Status successfuly updated', outcome: 'success'})
            return setOrder(result)
        })
        
    }

    return (
        <div className="card mb-3">
            <div className="card-body text-primary">
                <h5 className="text-info">Order#{ transaction_id }</h5>
                {props.admin && (
                    <Fragment>
                        <p className="">User: { user }</p>
                    </Fragment>
                )}
                
                <ul className="list-group mb-2">
                    <li className="list-group-item">Items</li>
                    {products.map(({product, name, count, price}) => (
                        <li key={product} className="list-group-item">{ name } x { count } @ ${ price }</li>
                    ))}
                </ul>
                <p className="text-muted">
                    Address: { address }
                    <br/>
                    Total: { amount }
                    <br/>
                    Date: { moment(createdAt).format('DD/MM/YYYY') }
                    <br/>
                    Updated: { moment(updatedAt).format('DD/MM/YYYY') } 
                    <br/>
                    Status: { status }
                </p>
                { props.admin && (
                <Fragment>
                    <label htmlFor="statusUpdate" className="form-control-label">Update status</label>
                    <select name="statusUpdate" id="" ref={statusSelect} className="form-control">
                        <option value="">Select new status</option>
                        { statusFields.map(field => (
                            <option key={field} value={ field } className="form-control">{ field }</option>
                        ))}
                    </select>
                    <button className="btn btn-info btn-block btn-lg" onClick={handleUpdate}> Submit</button>
                        { message.outcome && <p className={`${message.outcome === 'error' ? 'text-danger' : 'text-success'}`}>{ message.message }</p> }
                </Fragment>                    
                )}

            </div>
        </div>
    );
}

export default Order;
