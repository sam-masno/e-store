import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux';
import setAuthToken from 'utils/setAuthToken';
import { signInToken } from 'services';
import * as actions from 'actions';

//general components
import Header from 'components/layout/Header';

import Loading from 'components/layout/Loading';

import PublicRoutes from 'components/routes/PublicRoutes';
import Dashboards from 'components/routes/Dashboards';
import AdminFunctions from 'components/routes/AdminFunctions';
import AuthPages from 'components/routes/AuthPages';
import NotFound from 'components/layout/NotFound';
import Footer from 'components/layout/Footer'

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
        <div className="pb-0">
            <Header/>
            <Switch>
                {/* STORE AND PRODUCTPAGES*/}
                 { PublicRoutes() }
                {/* DASHBOARDS, CART, CHECKOUT */}
                 { Dashboards() }
                {/* ADMIN FUNCTIONS */}
                { AdminFunctions() }
                {/* AUTH COMPONENTS */}
                { AuthPages() }
                {/* Page not found */}
                <Route path='*' component={NotFound} />
        </Switch>
        {/* <Footer /> */}
        </div>
    );
}

const mapStateToProps = ({auth}) => ({auth})

export default connect(mapStateToProps, actions )(App);
