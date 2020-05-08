import React from 'react';

const ProductLayout = ({
    title = 'Title', 
    description = 'Description here...',
    className,
    children
    
}) => {
    return (
        <div>
            <div className="jumbotron d-flex bg-primary text-white" style={{borderRadius: 0}}>
                <div className="container">
                    <div className="text-center">
                        <h2>{ title }</h2>
                        <p className="lead">{ description }</p>
                    </div>
                    
                </div>                
            </div>
            <div className={ className }>
                { children }
            </div>
        </div>
    );
}

export default ProductLayout;
