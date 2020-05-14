import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center py-5">
            <h2 className="text-center mt-5">404 Page not found</h2>
            <p className="text-center">
                <Link to="/" className="text-info lead">Back to Store</Link>
            </p>
        </div>
    );
}

export default NotFound;
