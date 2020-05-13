import React from 'react';

const Loading = () => {
    return (
        <div className="bg-primary text-center text-white" style={{height: '100vh'}}>
            <h3 style={{position:'absolute', top: '48%', left: '50%',}} >
                <div className="spinner-grow text-white" role="status">
                    <span className="sr-only text-white">Loading...</span>
                </div>
            </h3>
        </div>
    );
}

export default Loading;
