import React, { useState, useEffect } from 'react';
import Product from 'components/main/Product';

import { getSimilarProducts } from 'services/products';

const SimilarProducts = ({productId}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        let mnt = true;
        getSimilarProducts(productId, (err, data) => {
            if(err) return 
            if(mnt) {
                return setProducts(data);
            }
        })

        return () => mnt = false
    },[])

    if(!products.length) return <div></div>

    return (
        <section className="bg-primary mt-5 py-3">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-white">Similar Products</h3>
                    </div>
                    {products.map(product => <Product key={product._id} product={product} image={false} />)}
                </div>
            </div>
        </section>

    );
}

export default SimilarProducts;
