import React from 'react';

const Footer = () => {
    return (
        <section id="footer" className=" mt-auto" style={{height: '20vh'}}>
            <div className="text-center pt-5">
                <h3 className="">
                E-Store &copy; { new Date(Date.now()).getFullYear() }
                </h3>
                
            </div>
        </section>
    );
}

export default Footer;
