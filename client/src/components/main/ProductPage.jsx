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

    const {name, description, createdAt, sold, price, quantity, _id, category, photo } = product;

    return (
        <Layout title={heading.title} description={heading.description} className="">
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-6">
                            <img src={photo} className="mb-3 card-img-top img-fluid" />
                            {/* <div className="card-image"> */}
                    </div>
                    {/* end of img div  */}
                    <div className="col-12 col-md-6 pt-5">
                            <div className="">
                                <h6 className="card-subtitle text-muted">Posted: { moment(createdAt).format('MM/DD/YYYY') }</h6>
                                <br/>
                                <ul className="list-unstyled">
                                    <li className="lead">
                                        Category: { category.name }
                                    </li>
                                    <li className="lead">
                                        Price: <span className="badge badge-success">${ price }</span> 
                                    </li>
                                    <li className="lead">
                                        In Stock: <span className={`badge badge-${quantity > 10 ? "success": "danger"}`}>{ quantity }</span>
                                    </li>
                                    <li className="lead">
                                        Sold: { sold }
                                    </li>
                                    <li className="lead">
                                        Description: <br/>
                                        { description }
                                    </li>
                                </ul>
                            </div>
                            <div className="">
                                 {quantity > 0 && <AddButton product={product} /> }
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
            <h5 className="text-white">
                <span className="badge badge-warning"> { count || 0 } </span>
                {' '}
                Add to Cart
            </h5>
        </button>
    )
})



export default ProductPage;
