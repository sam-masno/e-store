import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Logout from 'components/auth/Logout';
import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';

const AuthPages = () => [
            <Route exact path="/logout" component={ Logout } />,
            <Route exact path="/signin" component={ SignIn } />,
            <Route exact path="/signup" component={ SignUp } />  
]

export default AuthPages;
