import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../layout/Layout';

import { browse } from 'services/categories';

import { Product, Newest, Sellers, CategoryList } from 'components/main/homeComponents';

const Home = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('Select')
    
    useEffect(() => {
        if(category) {
            browse(category, (err, data) => {
                if(err) {
                    setMessage('No products found');
                    return setProducts([])
                }
                setProducts(data);
                // console.log(data)
            })
        }
        
    }, [category])

    const handleCategory = (event) => {
        setCategory(event.target.value)
    }


    return (
        <div>
            <Layout title={"E-Store"} description={"Buy stuff here"} className="py-0">
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
                    <div className="row home-section">

                        <div className="col-12 col-md-6 offset-md-3 text-center">
                            <h3>Browse By Category </h3>
                            <CategoryList 
                                handleCategory={handleCategory} 
                            />
                        </div>
                        {!products.length && (
                                <div className="col-12">
                                    <h3 className="text-center">E-store.com</h3>
                                </div>
                                
                            )
                        }

                        {/* PRODUCT RESULTS */}
                        { products
                        .map(product => <Product key={product._id} product={product} /> )}

                    </div>
                </div>
            </section>
            </Layout>
        </div>
    );
}

export default Home;
