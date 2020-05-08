import React, { Fragment,  useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import connectCart from 'components/user/cart/connectCart';

const Header = ({auth, user}) => {
    const location = useLocation();
    const [path, changePath] = useState(location.pathname);
    useEffect(() => {
        changePath(location.pathname);
    }, [location.pathname])

    const active = (pathname) => {
        return pathname === path ? '': 'text-white'
    } 

    const Dashboard = () =>    user.role === 1 ? (
        <li className="nav-item mr-2 text-white active">
            <Link to="/admin" className={active('/admin')}>Admin</Link>
        </li>
    )   :   (
        <li className="nav-item mr-2 text-white">
            <Link to="/dashboard" className={active('/dashboard')}>Dashboard</Link>
        </li>
    )

    const Links = () => {
        if(auth) {
            return (
                <Fragment>
                                        
                    {<Dashboard />}

                    <li className="nav-item mr-2 text-white">
                        <Link to="/" className={active('/')}>Home</Link>
                    </li>

                    <li className="nav-item mr-2 text-white">
                        <Link to="/logout" className={active('/logout')}>Sign out</Link>
                    </li>

                </Fragment>
            )
        }
        else{
            return (
                <Fragment>

                    <li className="nav-item mr-2 text-white">
                        <Link to="/" className={active('/')}>Home</Link>
                    </li>
                    <li className="nav-item mr-2">
                        <Link to="/signup" className={active('/signup')}>Sign Up</Link>
                    </li>
                    <li className="nav-item mr-2 text-white">
                        <Link to="/signin" className={active('/signin')}>Sign In</Link>
                    </li>
                    
                </Fragment>      
            )
        }
    }


    return (
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand text-white" to="/">E-Store</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <Links />
                </ul>
                <CartButton />
            </div>
        </nav>        
    </Fragment>
    );
}

const CartButton = connectCart(({cart:{total, count}}) => {

    const Total = () => total ? <h5 className="d-inline bg-success rounded px-2">${ total }</h5> : <div></div>
    return (
        <Link to="/cart">
            <div className="text-white d-flex mt-2">
                <Total />
                &nbsp;
                <span className="fas fa-shopping-cart fa-2x text-danger" ></span>
                <sup><span className="badge badge-warning">{ count } </span> </sup>
            </div>
        </Link>
        
    )
})

const mapStateToProps = ({auth, user}) => ({auth, user})

export default connect(mapStateToProps)(Header);