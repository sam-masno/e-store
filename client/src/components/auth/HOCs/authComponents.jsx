import React from 'react';

export const EmailInput = ({email, handleChange}) => (
    <div className="form-group">
        <label className="col-form-label col-form-label-lg" htmlFor="email">Email</label>
        <input className="form-control form-control-lg" type="email" name="email" value={email} onChange={handleChange} required />
    </div>
)

export const Passwords = ( {password, password2, handleChange}) => (
    <div className="form-group">
        <label className="col-form-label col-form-label-lg" htmlFor="password">Enter Password</label>
        <input className="form-control form-control-lg" type="password" name="password" minLength="6" value={password} onChange={handleChange} />
        <label className="col-form-label col-form-label-lg" htmlFor="password2">Verify Password</label>
        <input className="form-control form-control-lg" type="password" name="password2" minLength="6" value={password2} onChange={handleChange} required />
        
    </div>
)

export const Password = ({ password, handleChange }) => (
    <div className="form-group">
        <label className="col-form-label col-form-label-lg" htmlFor="password">Enter Password</label>
        <input className="form-control form-control-lg" type="password" name="password" minLength="6" value={password} onChange={handleChange} required/>           
    </div>
)

export const NameInput = ({name, handleChange}) => (
    <div className="form-group">
        <label className="col-form-label col-form-label-lg" htmlFor="name">Name</label>
        <input className="form-control form-control-lg" type="text" name="name" value={name} onChange={handleChange} minLength="6" required/>
    </div>
)