import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AddCategory from 'components/admin/categories/AddCategory';
import AddProduct from 'components/admin/products/AddProduct';
import UpdateCategory from 'components/admin/categories/UpdateCategory';
import UpdateProduct from 'components/admin/products/UpdateProduct';
import Orders from 'components/admin/orders/Orders';

const AdminFunctions = () => [ 
            <Route exact path="/add/category" component={ AddCategory } />,
            <Route exact path="/update/category" component={ UpdateCategory } />,
            <Route exact path="/add/product" component={ AddProduct } />,
            <Route exact path="/update/product" component={ UpdateProduct } />,
            <Route exact path="/admin/orders" component={ Orders } />,
]


export default AdminFunctions;
