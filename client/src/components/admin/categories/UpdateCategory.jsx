import React, { useState, useRef } from 'react';

import adminOnly from 'components/auth/HOCs/adminOnly';
import { CategoryList } from 'components/main/homeComponents'
import Layout from 'components/layout/Layout';

import { updateCategory, deleteCategory } from 'services/categories';

const UpdateCategory = () => {
    const catInput = useRef(null);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('')

    const handleSubmit = () => {
        const { value } = catInput.current;
        updateCategory( category, value, (err, result) => {
            setMessage('')
            if(err) return setMessage({ message: result, type: 'error' });
            setCategory('')
            return setMessage({ message: result })
        })
    }

    const handleCategory = (event) => {
        setMessage('');
        setCategory(event.target.value);
        if(category) catInput.current.value = ''
        
    }

    const handleDelete = () => {
        setMessage('');
        deleteCategory(category, (err, result) => {
            if(err) return setMessage({message:result, type: 'error'})
            setCategory('');
            return setMessage({message: 'Category removed'})
        })
    }

    const Message = ({message: { message, type }}) => {
    return <h4 className={`${ type === 'error' ? 'text-danger' : 'text-success'}`}>{ message }</h4>
    }

    return (
        <Layout>
        <div className="container py-5">
           <div className="row">
               <div className="card col-12 col-md-8 mx-auto">
                    <div className="card-header bg-white">
                        <h3 className="">Update a category</h3>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                                <CategoryList handleCategory={ handleCategory } category={ category } />
                                { message && <Message message={message} /> }

                                <fieldset>
                                    {category && (
                                        <div className="form-group">
                                        <label htmlFor="name">
                                            New name:
                                        </label>
                                        <input type="text" ref={catInput} className="form-control"/>
                                        <button className="btn btn-block btn-lg btn-info mt-2" onClick={handleSubmit}>Submit</button>
                                        <br/>
                                        <button className="btn btn-block btn-lg btn-danger" onClick={handleDelete}>Remove</button>
                                    </div>
                                    )}
                                    
                                </fieldset>
                        </div>
                   </div>
               </div>
           </div>
        </div>
        </Layout>
    )
}

export default adminOnly(UpdateCategory);
