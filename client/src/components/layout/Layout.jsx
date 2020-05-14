import React from 'react';

const ProductLayout = ({
    children
}) => {

    const style = {
        borderRadius: 0,
    }

    //******** KEEEP IN CASE OF ADDING HEADER LATER ON ******* */
    return (
        <div>
            <div className="d-flex bg-primary text-white" style={style}>
                <div className="container">
                    <div className="text-center">
                        <p className="lead mb-3">This site is for educational purposes only.</p>
                    </div>
                    
                </div>                
            </div>
            <div className="pt-5">
                { children }
            </div>
        </div>
    );
}

export default ProductLayout;
