import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from 'components/user/Dashboard';
import AdminDashboard from 'components/user/AdminDashboard';
import Cart from 'components/user/cart/Cart';
import Checkout from 'components/user/cart/Checkout';


const Dashboards = () => [
    <Route exact path="/dashboard" component={ Dashboard } />,
    <Route exact path="/admin" component={ AdminDashboard } />,
    <Route exact path="/cart" component={ Cart } />,
    <Route exact path="/checkout" component={ Checkout } />,
  
]

export default Dashboards;