import React, { useState, useEffect, Fragment } from 'react';
import { getCategories } from 'services/categories';
    

///***********CATEGORY SELECT LIST FOR BROWSE SECTION  */
export const CategoryList = React.memo(({ category, handleCategory }) => {
    const [error, setError] = useState('')
    const [categories, setCat] = useState( [] )

    useEffect(() => {
        getCategories((err, res) => {
            if(err) return setError(res)
            setCat(res)
        });
    }, [category])



    return (
        <div className="form-group">
            <label className="col-form-label col-form-label-lg" htmlFor="category">Browse By Category</label>
            {error && <small className="text-danger">{ error } </small> }
            <select className="custom-select" name="category" value={category} onChange={handleCategory} required>
            <option>Choose</option>
            { categories.map(({name, _id }) => (
                <option key={_id} value={_id} className="form-control">{ name }</option>
            ))}
            </select>
        </div>
    )

})

