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
    photo: '',
    loading: '',
    error: '',
    formData: new FormData ()
}

const AddProduct = () => {
    //state and effects

    const [success, setSuccess] = useState('');
    const [info, setInfo] = useState(defaultState);
    const { name, category, description, price, quantity, photo, loading, error, formData} = info;
    
    // event handlers
    const handleSubmit = event => {
        event.preventDefault();
        setSuccess('')
        setInfo({ ...info, loading:'Adding product', error: '' })
        addProduct(formData, (err, message) => {
            if(err) setInfo({ ...info, loading: '', error: message });
            setInfo({...defaultState, category: category});
            setSuccess(message)
            // setForm( new FormData() )
        })
    }

    const handleChange = event => {
        const{ name, value } = event.target
        if(name === 'photo') {
            formData.set('photo', event.target.files[0] )
            setInfo({...info, photo : event.target.files[0]})
        }else {
            formData.set(name, value)
            setInfo({...info, [event.target.name] : event.target.value})
        }
    }

    return (
        <Layout title="Add new products" description="Fill out the form below to add products to the e-store" className="container py-5">
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
                                        <Photo property={photo} handleChange={handleChange} /> 
                                        <Description property={description} handleChange={handleChange} />    
                                </div>
                                    </fieldset>

                                    { loading && <Loading message={ loading } />}
                                    { error && <Error error={ error }/> }
                                    { success && <Success message={ success }/> }

                            <button className="btn btn-block btn-primary mb-5" onClick={() => console.log(info)} >Submit</button>
                        </form>
                    </div>
                
            </div>
        </Layout>
    )
}

export default adminOnly(AddProduct);
