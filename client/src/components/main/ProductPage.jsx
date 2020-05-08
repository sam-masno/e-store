import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import moment from 'moment';
import connectCart from 'components/user/cart/connectCart';

import { getProduct } from 'services/products';

import Loading from 'components/layout/Loading';
import Layout from 'components/layout/Layout';
import ShowImage from 'components/layout/ShowImage';
import SimilarProducts from 'components/main/SimilarProducts';

const ProductPage = ({}) => {
    const { productId } = useParams();
    const [heading, setHeading] = useState({title: '', description: ''})
    const [product, setProduct] = useState('')
    
    useEffect(() => {
        let mnt = true;
        window.scrollTo(0,0);
        setProduct('')
        getProduct(productId, (err, data) => {
            if(err) return setHeading({title: 'Error', description: data})
            if(mnt) {
                const { name, description } = data;
                setProduct(data);
                setHeading({title: name, description});
            }
        })
        return () => mnt = false;
    },[productId]);

    if(!product) {
        return <Loading />
    }

    const {name, description, createdAt, sold, price, quantity, _id, category } = product;

    return (
        <Layout title={heading.title} description={heading.description} className="">
            <div className="container">
                <div className="row">
                    <div className="col col-md-9 mx-auto">
                        <div className="card h-100 bg-primary">
                            <ShowImage item={_id} url={'product'} />
                            {/* <div className="card-image"> */}
                            {/* </div> */}
                            <div className="card-body">
                                <h6 className="card-subtitle text-muted">Posted: { moment(createdAt).format('MM/DD/YYYY') }</h6>
                                <br/>
                                <ul className="list-group">
                                    <li className="list-group-item lead">
                                        Category: { category.name }
                                    </li>
                                    <li className="list-group-item lead">
                                        Price: <span className="badge badge-success">${ price }</span> 
                                    </li>
                                    <li className="list-group-item lead">
                                        In Stock: <span className={`badge badge-${quantity > 10 ? "success": "danger"}`}>{ quantity }</span>
                                    </li>
                                    <li className="list-group-item lead">
                                        Sold: { sold }
                                    </li>
                                    <li className="list-group-item lead">
                                        Description: <br/>
                                        { description }
                                    </li>
                                </ul>
                            </div>
                            <div className="card-footer bg-primary">
                                <AddButton product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SimilarProducts productId={_id} />
        </Layout>
    );
}

const AddButton = connectCart(({product, addItem, cart}) => {
    const [count, setCount] = useState(null);
    useEffect(() => {
        let mnt = true;
        let current = cart.items.filter((item) => item._id === product._id);
        if(current.length && mnt) setCount(current[0].count)

        return () => mnt = false;
    },[cart.items] )    

    const handleAdd = () => {
        addItem(product)
    }

    return (
        <button type="button" className="btn btn-danger btn-lg btn-block" onClick={handleAdd} >
            <span className="badge badge-warning"> { count || 0 } </span>
            {' '}
            Add to Cart
        </button>
    )
})



export default ProductPage;
