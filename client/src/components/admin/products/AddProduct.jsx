import React, { useState } from 'react';

import { addProduct } from 'services/products';

import Layout from 'components/layout/Layout';
import { GoBack, Error, Success, Loading } from 'components/layout/layoutComponents';
import { ProductName, Price, Description, Photo, Quantity, CategorySelect } from 'components/admin/products/productComponents';

import adminOnly from 'components/auth/HOCs/adminOnly';

const defaultState = {
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    loading: '',
    error: ''
}

const AddProduct = () => {
    //state and effects

    const [success, setSuccess] = useState('');
    const [info, setInfo] = useState(defaultState);
    const { name, category, description, price, quantity, loading, error } = info;
    const [ photo, setPhoto ] = useState('')
    
    // event handlers
    const handleSubmit = event => {
        event.preventDefault();
        //change message notifications
        setSuccess('')
        setInfo({ ...info, loading:'Adding product', error: '' })

        addProduct(info, photo , (err, message) => {
            if(err) return setInfo({ ...info, loading: '', error: message });
            setInfo({...defaultState, category: category});
            setSuccess(message)
        })
    }

    const handleFile = event => {
        const { files } = event.target
        if( !files[0]) setPhoto('')
        else setPhoto( files[0] )
    }

    const handleChange = event => {
        setInfo({...info, [event.target.name] : event.target.value})
    }
    return (
        <Layout>
            {/* <GoBack className="btn-outline-info"/> */}
            <div className="container">
                <div className="card col-12 col-md-8 mx-auto bg-light">
                    <form  className="h-100"onSubmit={handleSubmit} autoComplete="off">
                            <fieldset>
                                <div className="form-group">
                                    <ProductName property={name} handleChange={handleChange} />
                                    <CategorySelect property={category} handleChange={handleChange}/>
                                    <div className="row">
                                        <Price property={price} handleChange={handleChange} /> 
                                        <Quantity property={quantity} handleChange={handleChange} /> 
                                    </div>
                                        <Photo property={photo} handleChange={ handleFile } /> 
                                        <Description property={description} handleChange={handleChange} />    
                                </div>
                                    </fieldset>

                                    { loading && <Loading message={ loading } />}
                                    { error && <Error error={ error }/> }
                                    { success && <Success message={ success }/> }

                            <button className="btn btn-block btn-info mb-5" >Submit</button>
                        </form>
                    </div>
                
            </div>
        </Layout>
    )
}

export default adminOnly(AddProduct);
