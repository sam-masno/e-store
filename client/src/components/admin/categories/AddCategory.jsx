import React, { useState } from 'react';

//functions
import { addCategory } from 'services/categories';

//components
import adminOnly from 'components/auth/HOCs/adminOnly';
import {  Error, Success } from 'components/layout/layoutComponents'
import Layout from 'components/layout/Layout';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        setError('')
        setSuccess('')
        addCategory(name, (err, message) => {
            if(err) return setError(message)
            setSuccess(message)
            setName('')
        })
    }

    const handleChange = event => {
        setName(event.target.value)
    }

    return (
        <Layout>
        <div className="container py-5">
           <div className="row">
               <div className="card col-12 col-md-8 mx-auto px-0">
                    <div className="card-header">
                        <h3 className="">Add a new category</h3>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Category Name:
                                        </label>
                                        <input type="text"  value={name} onChange={handleChange} className="form-control" required/>
                                    </div>
                                </fieldset>
                                { error && <Error error={ error }/> }
                                { success && <Success message={ success }/> }
                                <button className="btn btn-block btn-info">Submit</button>
                            </form>
                        </div>
                   </div>
                   
               </div>
           </div>
        </div>
        </Layout>
    )
}

export default adminOnly(AddCategory);
