import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from 'components/main/Home';
import ProductPage from 'components/main/ProductPage';

const PublicRoutes = () =>  [
    <Route exact path="/" component={ Home } />,
    <Route path="/product/view/:productId" component={ProductPage} />,
    
]

export default PublicRoutes;
