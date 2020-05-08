import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux';
import setAuthToken from 'utils/setAuthToken';
import { signInToken } from 'services';
import * as actions from 'actions';

//general components
import Header from 'components/layout/Header';
import Home from 'components/main/Home';
import ProductPage from 'components/main/ProductPage';
import Loading from 'components/layout/Loading';

//user components
import Dashboard from 'components/user/Dashboard';
import AdminDashboard from 'components/user/AdminDashboard';
import Cart from 'components/user/cart/Cart';
import Checkout from 'components/user/cart/Checkout';

//auth components
import Logout from 'components/auth/Logout';
import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';

//admin components
import AddCategory from 'components/admin/categories/AddCategory';
import AddProduct from 'components/admin/products/AddProduct';
import UpdateCategory from 'components/admin/categories/UpdateCategory';
import UpdateProduct from 'components/admin/products/UpdateProduct';
import Orders from 'components/admin/orders/Orders';

//check if token available and set axios default auth headers
if(localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'))
}

const App = ({setAuth, auth, setUser, setItems }) => {
    useEffect(() => {
        //check if there is a cart in localStorage
        let cart = JSON.parse(localStorage.getItem('e-cart'))
        
        if(cart) setItems(cart);

        if(auth === null) {
            signInToken((success, user) => {
                setUser(user)
                setAuth(success)
            })
        }
    },[auth])

    if(auth === null) {
        return (  
            <Loading />
        )
    }

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/product/view/:productId" component={ProductPage} />

                {/* DASHBOARDS */}
                <Route exact path="/dashboard" component={ Dashboard } />
                <Route exact path="/admin" component={ AdminDashboard } />
                <Route exact path="/cart" component={ Cart } />
                <Route exact path="/checkout" component={ Checkout } />


                
                {/* ADMIN FUNCTIONS */}
                <Route exact path="/add/category" component={ AddCategory } />
                <Route exact path="/update/category" component={ UpdateCategory } />

                <Route exact path="/add/product" component={ AddProduct } />
                <Route exact path="/update/product" component={ UpdateProduct } />

                <Route exact path="/admin/orders" component={ Orders } />


                {/* AUTH COMPONENTS */}
                <Route exact path="/logout" component={ Logout } />
                <Route exact path="/signin" component={ SignIn } />
                <Route exact path="/signup" component={ SignUp } />           
        </Switch>
        </div>
    );
}

const mapStateToProps = ({auth}) => ({auth})

export default connect(mapStateToProps, actions )(App);
