import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from 'components/layout/Layout';
import adminOnly from 'components/auth/HOCs/adminOnly';

import { CategoryLinks, ProductLinks, AccountInformation, PurchaseHistory, OrdersLinks } from 'components/user/adminComponents';

const AdminDashboard = ({ user: {name, email, about, _id} }) => {

    

    return (
        <Layout title={name} description={`Welcome back, ${ name }`} className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <OrdersLinks />
                    <CategoryLinks />
                    <ProductLinks />
                </div>
                <div className="col-12 col-md-8">
                    <AccountInformation name={name} email={email} about={about}  />
                    <PurchaseHistory id={_id}/>
                </div>
            </div>
        </Layout>
    );
}

export default adminOnly(AdminDashboard);
