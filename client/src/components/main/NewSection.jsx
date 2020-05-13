import React, { useState, useEffect, Fragment } from 'react';

//services
import { getProducts } from 'services/products';
//components
import Product from 'components/main/Product';
import { Spinner } from 'components/layout/layoutComponents'

const Newest = React.memo(({ newest }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts(['createdAt', -1], (err, data) => {
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
        <section id="new-releases" className="bg-primary">
            <div className="p-5 bg-primary">
                <h2 className="text-center text-white" >New Releases</h2>
            </div>
            <div className="container">
                <div className="row home-section py-5">
                    <Main />
                </div>
            </div>
        </section>
    )
})

export default Newest;