import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../layout/Layout';

import { browse } from 'services/categories';

import { Product, Newest, Sellers, CategoryList } from 'components/main/homeComponents';

const Home = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(50.00)
    const [message, setMessage] = useState('Browse by category')
    useEffect(() => {
        if(category) {
            browse(category, (err, data) => {
                if(err) {
                    setMessage('No products found');
                    return setProducts([])
                    console.log(data)
                }
                setProducts(data);
                // console.log(data)
            })
        }
        
    }, [category])

    const handleCategory = (event) => {
        setCategory(event.target.value)
    }
    const handlePrice = event => {
        setPrice(event.target.value)
    }

    return (
        <div>
            <Layout title={"MERN E-Store"} description={"Buy stuff here"} className="py-0">
            <section id="new-releases" className="">
                <div className="container py-5">
                    {/* SORTED BY CREATEDAT */}
                    <Newest />
                </div>
            </section>
            <section id="best-sellers" className="bg-primary py-5">
                <div className="container">
                    {/* SORTED BY SOLD */}
                    <Sellers />
                </div>
            </section>
            <section id="browse" className="py-5">
                {/* SELECT CATEGORY AND FILTER BY MAX PRICE */}
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <CategoryList handleCategory={handleCategory}/>
                            <div className="form-group">
                                <label htmlFor="price">Max Price</label>
                                <div className="form-group-prepend">
                                    <div className="form-group-text">

                                    </div>
                                </div>
                                <input type="number" min={1} value={price} onChange={handlePrice} className="form-control"/>
                            </div>
                        </div>
                        {/* HEADING FOR BROWSE SECTION  */}
                        {!products.length && (
                            <div className=" col text-center">
                                <h3 className="text-center">{ message }</h3>
                            </div>
                            )
                        }

                        {/* PRODUCT RESULTS */}
                        { products
                        .filter(product => product.price <= price )
                        .map(product => <Product key={product._id} product={product} /> )}

                    </div>
                </div>
            </section>
            </Layout>
        </div>
    );
}

export default Home;
