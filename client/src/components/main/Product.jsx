import React from 'react';
import { Link } from 'react-router-dom';
import { AddButton } from 'components/layout/layoutComponents'
import ShowImage from 'components/layout/ShowImage';

const  Product = ({ product, product: {name, description, createdAt, sold, price, quantity, _id }, image = true}) => (
    <div className="col-12 col-md-4 mb-5">
        <div className="card h-100">

            { image && <ShowImage src={product.photo} />}

            <div className="card-header py-3">
                <h4 className="text-center">{ name }</h4>
            </div>
            <div className="card-body">
                <h6 className="card-subtitle text-muted">Posted: { new Date(createdAt).toLocaleTimeString() }</h6>
                <br/>
                <h6><span className="font-weight-bold">Price:</span> ${ price }</h6>
                <h6><span className="font-weight-bold">Availability:</span> 
                    {' '}
                    {
                        quantity > 0 ? <span className="bg-success rounded px-2 text-white">In Stock</span> : <span className="bg-warning rounded">Out of Stock</span>
                    }
                </h6>
                <h6><span className="font-weight-bold">Sold:</span> { sold }</h6>
            </div>
            <div className="card-footer bg-white">
                <AddButton product={product} />
                <Link to={`/product/view/${_id}`} className="btn btn-info float-right">View</Link>
            </div>
        </div>
    </div>
)

export default Product