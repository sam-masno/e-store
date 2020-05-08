import React from 'react';

const Loading = () => {
    return (
        <div className="bg-primary text-center text-white" style={{height: '100vh'}}>
            <h3 style={{position:'absolute', top: '48%', left: '50%',}} >
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </h3>
        </div>
    );
}

export default Loading;
