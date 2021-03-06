import React, { useEffect, useState } from 'react';
import { signout } from 'services';

import { connect } from 'react-redux';
import { userSignout } from 'actions';

import Layout from 'components/layout/Layout';

const Logout = ({ userSignout }) => {
    const [message, setMessage] = useState('Signing out...')

    useEffect(() => {
        signout((err, message) => {
            if(err) return setMessage(message);
            userSignout()
            console.log()
            return setMessage(message)
            
        });
    }, [])
    return (
        <div>
            <Layout title="" description={ message }></Layout>
            <div className="container py-5">
                <h4 className="text-center">You have been logged out</h4>
            </div>
        </div>
    );
}

export default connect(null, { userSignout })(Logout);
