import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from 'services/products';
import { getCategories } from 'services/categories';
import { AddButton } from 'components/layout/layoutComponents'
import ShowImage from 'components/layout/ShowImage';

export const Product = ({ product, product: {name, description, createdAt, sold, price, quantity, _id }, image = true}) => (
    <div className="col-12 col-md-4 p-2">
        <div className="card h-100">

            { image && <ShowImage item={_id} url={'product'} />}

            <div className="card-header py-3">
                <h4 className="text-center">{ name }</h4>
            </div>
            {/* <div className="card-image"> */}
            {/* </div> */}
            <div className="card-body">
                <h6 className="card-subtitle text-muted">Posted: { new Date(createdAt).toLocaleTimeString() }</h6>
                <br/>
                <h6>Price: ${ price }</h6>
                <h6>Availablity: {' '}
                    {
                        quantity > 0 ? <span className="bg-success rounded px-2 text-white">In Stock</span> : <span className="bg-warning rounded">Out of Stock</span>
                    }
                </h6>
                <h6>Sold: { sold }</h6>
                <p className="card-text text-truncate">
                    { description }
                </p>
            </div>
            <div className="card-footer bg-white">
                <AddButton product={product} />
                <Link to={`/product/view/${_id}`} className="btn btn-outline-info float-right">View</Link>
            </div>
        </div>
    </div>
)

export const Sellers = React.memo(() => {
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
                    <h6>Loading</h6>
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
        <div className="row">
            <div className="text-center col-12 text-white">
                <h3>Best Sellers</h3>
            </div>
            <Main />
        </div>
    )
})
export const Newest = React.memo(({ newest }) => {
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
                    <h6>Loading</h6>
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
        <div className="row">
            <div className="text-center col-12">
                <h3>New Releases</h3>
            </div>
            <Main />
        </div>
    )
})



export const CategoryList = React.memo(({ category, handleCategory }) => {
    useEffect(() => {
        getCategories((err, res) => {
            if(err) return setError(res)
            setCat(res)
        });

    }, [category])
    const [error, setError] = useState('')
    const [categories, setCat] = useState(
        [ ]
    )

    return (
        <div className="form-group">
            <label className="col-form-label col-form-label-lg" htmlFor="category">Browse By Category</label>
            {error && <small className="text-danger">{ error } </small> }
            <select className="custom-select" name="category" value={category} onChange={handleCategory} required>
                <option value="" >Choose...</option>
            { categories.map(({name, _id }) => (
                <option key={_id} value={_id} className="form-control">{ name }</option>
            ))}
            </select>
        </div>
    )

})