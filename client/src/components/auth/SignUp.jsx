import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import hideAuth from 'components/auth/HOCs/hideAuth';
import { Spinner } from 'components/layout/layoutComponents';

//utils
import { signup } from 'services';
import { setAuth, setUser } from 'actions';
import { connect } from 'react-redux';

//form components
import { EmailInput, Passwords, NameInput } from 'components/auth/HOCs/authComponents';

const SignUp = ({ setAuth, setUser }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    //handle form info
    const [form, setForm] = useState({name:'', email:'', password:'', password2:''})
    let { name, email, password, password2 } = form;

    //error setup
    const [error, setError] = useState('');

    //event handlers
    const handleChange = event => {
        setForm({...form,[event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true)
        setError('')
        if(password !== password2) setError('Passwords do not match')
        else if(password.length >= 6 && password === password2) {
            signup({name, email, password}, (error, user) => {
                setLoading(false)
                if(error) return setError(error);
                setUser(user)
                setAuth(true);
                history.push('/'); 

            })
        }
    }

    //form components

    return (
        <div>
            <Layout title="Sign up" description="Open an account and start shopping today." className="container py-2">
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <p className="text-center lead">Already have an account? <Link to="/signin" className="text-info">Sign in here</Link></p>
                    <div className="row py-5">
                        <div className="col col-md-6 mx-auto card py-3">
                            <div className="card-content">
                                { <NameInput name={name} handleChange={handleChange} /> }
                                { <EmailInput email={ email } handleChange={ handleChange } /> }
                                { <Passwords password={password} password2={password2} handleChange={handleChange} /> }    
                                { error && <div className="alert alert-danger">{ error } </div> } 
                                <div className="text-center py-2">
                                { loading && <Spinner color="info"/>}                        

                                </div>
                                <button className="btn btn-block btn-primary btn-lg" type="submit">Create Account</button>
                            </div>
                            
                        </div>
                    </div>                    
                </form>
            </Layout>
        </div>
    );
}

export default connect(null, { setAuth, setUser })(
    hideAuth(SignUp)
    );
