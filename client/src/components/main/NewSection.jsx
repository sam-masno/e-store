import React, { useState, useEffect, Fragment } from 'react';

//services
import { getProducts } from 'services/products';
//components
import Product from 'components/main/Product';
import { Spinner } from 'components/layout/layoutComponents';
import bgImage from 'components/main/img/image3.jpg';

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

    const section = {
        background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9) ), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
    }

    return (
        <section id="new-releases" className="bg-primary home-section" style={section}>
            <div className="container py-5">
                <h1 className="text-center text-white">New Releases</h1>
                <div className="row home-section py-5">
                    <Main />
                </div>
            </div>
        </section>
    )
})

export default Newest;