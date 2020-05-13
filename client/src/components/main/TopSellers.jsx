import React, { useState, useEffect } from 'react';
import { getProducts } from 'services/products';
import { Spinner } from 'components/layout/layoutComponents'
import Product from 'components/main/Product';

const TopSellers = React.memo(() => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts(['sold', -1], (err, data) => {
            if(err) return err;
            setProducts(data)
        })
    },[])
    const Main = () => {
        if(!products.length) {
            return (
                <div className="mx-auto text-center">
                    <Spinner color="danger"/>
                </div>
            )
        }
        else {
            return products.map(product => (
                        <Product key={product._id} product={product}></Product>
                    ))
        }
    }
    return (
        <section id="top-sellers">
            <div className="py-5">
                <h2 className="text-center">Best Sellers</h2>
            </div>
            <div className="container">
                <div className="row home-section py-5">
                    <Main />
                </div>
            </div>

        </section>
    )
})

export default TopSellers;