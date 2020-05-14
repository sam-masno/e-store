import React, { useState, useEffect} from 'react';

//components
import adminOnly from 'components/auth/HOCs/adminOnly';
import { CategoryList } from 'components/main/homeComponents';
import Layout from 'components/layout/Layout';
import { ProductName, Price, Description, Quantity, CategorySelect, Photo } from 'components/admin/products/productComponents';


//services
import { browse } from 'services/categories';
import { updateProduct, deleteProduct } from 'services/products';

//**********COMPONENT FLOW**************
// ON MOUNT RETRIEVES CATEGORIES AND PUTS IN CATEGORIESLIST DROPDOWN
//ON CATEGORYSELECT CHANGE RETRIEVES ALL PRODUCTS OF THAT CATEGORY AND PUTS INTO PRODUCTS & PRODUCLIST/CLEARS CURRENT AND SETS TO FIRST RESULT/ FORM IS CLEARED
// SET CURRENT ON PRODUCT SELECT AND CURRENT POPULATES FORM/ FORM IS RESET
// ON FORM CHANGE, FORM (WHICH IS A FORMDATA) PROPERTIES ARE SET
// ON SUBMIT, FORM IS SENT TO API/ FORM IS CLEARED ON SUCCESS AND CURRENT UPDATED TO REFLECT UPDATE
// UPDATES WILL BE AVAILABLE IMMEDIATELY

const UpdateProduct = () => {
    const [cat, setCategory] = useState('');
    const [message, setMessage] = useState('')
    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState('');
    const [file, setFile] = useState('')
    const { name, quantity, price, description, category } = current;

    useEffect(() => {
        let mnt = true;
        if(cat && cat !== 'Choose') {
            browse(cat, (err, result) => {
                if(mnt) {
                    setMessage({message:'', type:''})
                    if(err) return setMessage({message: result, type: 'error'});
                    setProducts(result);
                    setCurrent(result[0]);
                }
            })
        }
        return () => mnt = false;
    }, [cat]);

    //HANDLE CHANGE FOR CATEGORYLIST COMPONENT
    const handleCategory = (event) => {
        setCategory(event.target.value)
        setCurrent('')
    }
    
    //SET CURRENT PRODCUT TO POPULATE FORM, CLEAR FORM
    const setCurrentProduct = event => {
        setMessage({message:''})
        setCurrent(products.filter(product => product._id === event.target.value)[0])
    } 

    //SUBMIT FORM CHANGES TO API, UPDATE MESSAGES
    const handleSubmit= event => {
        updateProduct(current, current._id, file, (err, result) => {
            if(err) return setMessage({ message: result, type:'error' });
            setMessage({message: 'Update successful', type: 'success'})
            setProducts(products.map(product => product._id === result._id ? result : product))
        })
    }

    //UPDATE STATE AND FORM WHEN INPUTS ARE CHANGED
    const handleChange = event => {
        const{ name, value } = event.target
        setCurrent({...current, [name] : value})
    }

    // handle file select for file
    const handleFile = event => {
        const { files } = event.target
        if(!files[0]) {
            setFile('')
        } else {
            setFile(files[0])
        }
    }

    //DELETE PRODUCT
    const handleDelete = () => {
        deleteProduct(current._id, (err, result) => {
            if(err) return setMessage({message: result, type: 'error'});
            setCurrent('')
            return setMessage({message: result})
        })
    }

    //GENERATE DROPDOWN LIST FOR PRODUCTS
    const ProductsList = () => {
        return (
            <select id="" onChange={setCurrentProduct} className="form-control">
                <option value="">{ name || 'Select' } </option>
                {products.map(product => (
                    <option key={ product._id } value={product._id}> {product.name }</option>
                 ) )}

            </select>
        )
    }

    return (
        <Layout>
        <div className="container py-5">
            <div className="col-12 col-md-9 mx-auto">
                <h4>Update product</h4>
                
                <CategoryList category={ cat } handleCategory={ handleCategory} />
                <h5>Choose product</h5>
                <ProductsList />
                <br/>
                { !current &&  message.message && (
                    <h4 className={`${message.type === 'error' ? 'text-danger': 'text-success'}`}>
                        { message.message }
                    </h4>    
                )}
                {/* SHOW UPDATE FORM IF CURRENT SELECTED */}
                { current && (
                    <div className="card p-5">
                        <fieldset>
                                <div className="form-group">
                                    <ProductName property={name} handleChange={handleChange}/>
                                    <CategorySelect property={category} handleChange={handleChange} />
                                    <div className="row">
                                        <Price property={price} handleChange={handleChange} />
                                        <Quantity property={quantity} handleChange={handleChange} />
                                    </div>
                                    <Photo property = { file } handleChange={handleFile} />
                                    <Description property={description} handleChange={handleChange} />
                                    <h4 className={`${message.type === 'error' ? 'text-danger': 'text-success'}`}> { message.message } </h4> 
                                    <button className="btn btn-block btn-lg btn-info mb-5" onClick={handleSubmit} >Submit</button> 
                                    <button className="btn btn-block btn-lg btn-danger" onClick={handleDelete}>REMOVE PRODUCT</button> 
                                </div> 
                        </fieldset>
                    </div>
                )}
            </div>
        </div>
        </Layout>
    );
}

export default adminOnly(UpdateProduct);
