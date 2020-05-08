import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Layout from 'components/layout/Layout';

//utils
import { signin } from 'services';

import { connect } from 'react-redux';
import { setAuth, setUser } from 'actions';

//components
import { EmailInput, Password } from 'components/auth/HOCs/authComponents';
import hideAuth from 'components/auth/HOCs/hideAuth';

const SignIn = ({ setAuth, setUser }) => {
    //hooks setup
    const[info, setInfo] = useState({email: 'sam@gmail.com', password:'123456'});
    let { password, email } = info;
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    //handlers
    const handleChange = event => {
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setError('')
        setLoading(true)
        signin(info, (error, user) => {
            setLoading(false)
            if(error) return setError(error)
            setInfo({email:'', password:''})
            setUser(user);
            setAuth(true);
            history.push(user.role === 1 ? '/admin' : '/dashboard'); 
            
        })
    }

    return (
        <Layout title="Sign in" description="Sign in to manage your purchases and account information" className="container py-2">
            <p className="text-center lead">No account? <Link to="/signin">Sign up here</Link></p>
        <form onSubmit={handleSubmit} onChange={handleChange}>
            
            <div className="row">
                <div className="col col-md-6 mx-auto card py-3">                    
                    <div className="card-content">
                        { <EmailInput email={ email } handleChange={ handleChange } /> }
                        { <Password password={password} handleChange={handleChange} /> }    
                        { error && <div className="alert alert-danger">{ error } </div> }
                        <p className="text-info lead">{ loading && `Loading...` }</p>                       
                        <button className="btn btn-block btn-primary btn-lg" type="submit">Create Account</button>
                    </div>
                    
                </div>
            </div>                    
        </form>
    </Layout>
    );
}

export default connect(
    null, { setAuth, setUser }) 
    (
        hideAuth(SignIn)
    );
