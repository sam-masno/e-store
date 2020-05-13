import React from 'react';

const ProductLayout = ({
    title = 'Title', 
    description = 'Description here...',
    className,
    children
    
}) => {

    const style = {
        borderRadius: 0,
    }

    //******** KEEEP IN CASE OF ADDING HEADER LATER ON ******* */
    return (
        <div>
            <div className="d-flex bg-primary text-white" style={style}>
                {/* <div className="container">
                    <div className="text-center">
                        <h2 className="text-white">{ title }</h2>
                        <p className="lead">{ description }</p>
                    </div>
                    
                </div>                 */}
            </div>
            <div className={ className }>
                { children }
            </div>
        </div>
    );
}

export default ProductLayout;
