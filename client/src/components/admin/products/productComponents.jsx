import React, { useRef, useState, useEffect } from 'react';
import { getCategories } from 'services/categories';

export const ProductName = ({property = '', handleChange}) => (
    <div className="form-group">
        <label className="col-form-label col-form-label-lg" htmlFor="name">Product Name</label>
        <input className="form-control form-control-lg" type="text" name="name" value={property} onChange={handleChange} minLength="3" required/>
    </div>
    )
    

export const Photo = ({ property, handleChange }) => {

    const photoInput = useRef(null);
    const onClick = () => {
        photoInput.current.click();
    }

    return (
        <div >
            <label htmlFor="photo" className="col-form-label col-form-label-lg">Upload a Photo</label>
            <br/>   
            <div className="">
                <button className="btn btn-sm btn-info mb-2" type="button" onClick={onClick}>Browse</button>
                <p className="form-control form-control-lg text-truncate ">{ property.name || 'None'}</p>
            </div>
            {/* HIDE INPUT BUTTON AND USE REF TO FORWARD CLICK */}
            <input type="file" className="d-none" name="photo" onChange={handleChange} accept="image/*" ref={photoInput}/>
        </div>
    )    
}

export const Price = ({property, handleChange}) => (
    <div className="form-group col">
        <label className="col-form-label col-form-label-lg" htmlFor="price">Price</label>
        <input className="form-control form-control-lg" type="number"  min="1" name="price" value={property} onChange={handleChange} required/>
    </div>
)
export const Quantity = ({property, handleChange}) => (
    <div className="form-group col">
        <label className="col-form-label col-form-label-lg" htmlFor="quantity">Quantity</label>
        <input className="form-control form-control-lg" type="number" name="quantity" value={property} onChange={handleChange} min="1" required/>
    </div>
)

export const Description = ({property , handleChange}) => (
    <div className="form-group">
        <label className="col-form-label col-form-label-lg" htmlFor="description">Description</label>
        <textarea className="form-control" name="description" rows="5" value={property} onChange={handleChange}  required/>
    </div>
)

export const CategorySelect = ({category, handleChange}) => {
    const [option, setOption] = useState('')
    useEffect(() => {
        setOption(category)

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
            <label className="col-form-label col-form-label-lg" htmlFor="category">Select Category</label>
            {error && <small className="text-danger">{ error } </small> }
            <select className="custom-select" name="category" value={category} onChange={handleChange} required>
                <option value="" >Choose...</option>
            { categories.map(({name, _id }) => (
                <option key={_id} value={_id} className="form-control">{ name }</option>
            ))}
            </select>
        </div>
    )

}
