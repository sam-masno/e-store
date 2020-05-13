import React, { useState, useEffect } from 'react';

import { browse } from 'services/categories';

//components
import { CategoryList } from 'components/main/homeComponents';
import { Spinner } from 'components/layout/layoutComponents';
import Product from 'components/main/Product';


const Browse = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    
    //if category changes, update product
    useEffect(() => {
        if(category) {
            setLoading(true)
            browse(category, (err, data) => {
                setLoading(false)
                if(err) {
                    setMessage('No products found');
                    return setProducts([])
                }
                setProducts(data);
            })
        }
    }, [category])
    const handleCategory = (event) => {
        setCategory(event.target.value)
    }

    //provide any error messages
    const Message = () => {
        if(message) {
            return (
                <div className="col-12 text-center bg-primary text-danger">
                    <h4>{ message }</h4>
                </div>
            )
        } 
        return (
            <div></div>
        )
    }
    // map products to product cards
    const Products = () => {
        //return loading spinner
        if(loading) {
            return (
                <div className="col-12 bg-primary">
                    <div className="text-center">
                        <Spinner color="white" />
                    </div>
                </div>
            ) 
        }
        //return phone icon if not loading and no products
        if(!products.length) {
            return (
                <div className="col-12">
                    <div className="text-center">
                        <span className="fas fa-5x fa-mobile-alt text-white"></span>
                    </div>
                </div>
            )
        } 
        //return mapped products
        else {
            return products.map(product => <Product key={product._id} product={product} />)
        }
    }
    // return section
    return (
        <section id="browse" className="py-5 bg-primary text-white">
        {/* SELECT CATEGORY AND FILTER BY MAX PRICE */}
        <div className="container">
            <div className="row home-section">
                <div className="col-12 col-md-6 offset-md-3 text-center mb-5">
                    <h3 className="text-white">Shop Around</h3>
                    <Message />
                    <CategoryList 
                        handleCategory={handleCategory} 
                    />
                </div>
                <Products />
            </div>
        </div>
    </section>
    )
}

export default Browse;