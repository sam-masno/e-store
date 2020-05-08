import React from 'react';

import { Link } from 'react-router-dom';

import Layout from 'components/layout/Layout';
import requireAuth from 'components/auth/HOCs/requireAuth';
import { PurchaseHistory } from 'components/user/adminComponents';

const Dashboard = ({ user: {name, email, about, _id } }) => {

    
    const AccountInformation = () => (
        <div className="card mb-5 col-12 col-md-8 px-0 mx-auto">
            <div className="card-header">
                <h3 className="card-title">Account Information</h3>
            </div>
            <div className="card-content">
                <ul className="list-group">
                    <li className="list-group-item">
                        Name: { name }
                    </li>
                    <li className="list-group-item">
                        Email: { email }
                    </li>
                </ul>
            </div>
        </div>
    )

    const UserLinks = () => (
        <div className="card mb-3 col-12 col-md-8 px-0 mx-auto">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link to="/cart" className="nav-link ">My Cart</Link>
                </li>
                <li className="nav-item">
                    <Link to="/update/profile" className="nav-link ">Update Profile</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">Purchase History</a>
                </li>
            </ul>
        </div>        
    )

    return (
        <Layout title={name} description={`Welcome back, ${ name }`} className="container">
            <div className="row">
                <UserLinks />
                <AccountInformation />
                <div className="mx-auto col-12 col-md-8">
                    <PurchaseHistory id={_id}/>
                </div>    
                
            </div>

        </Layout>
    );
}

export default requireAuth(Dashboard);
