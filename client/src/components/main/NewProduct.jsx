import React from 'react';
import android from 'components/main/img/android.jpeg'
const NewProduct = () => {

    const styles = {
       minHeight: '100vh',
    }
    return (
        <section  className="py-5"style={styles}>
            <div className="container">
                <div className="row">
                    <div className="d-none d-md-block col-md-6">
                        <img src={ android } alt="new android phone" className="img-fluid"/>
                    </div>
                    <div className="col-12 col-md-6" style={styles}>
                        {/* <div className="align-middle"> */}
                            <h2 className="text-center">New This Season</h2>
                            <br/>
                            <br/>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolorem modi voluptate commodi vel aliquam quos itaque excepturi fugit pariatur veritatis obcaecati ratione rerum, placeat cumque assumenda eum repellendus nobis?</p>
                            <br/>
                            <br/>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur at repudiandae exercitationem recusandae quisquam quasi nostrum optio alias, ut consequuntur, molestiae iste harum incidunt corrupti sed facere blanditiis! Alias, ipsa!</p>
                            <br/>
                            <br/>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsum quam pariatur reiciendis aut voluptate blanditiis eos expedita exercitationem culpa iure maxime cum eligendi dolorum libero maiores, similique harum repellendus!</p>
                        {/* </div> */}
 
                    </div>
                </div>


            </div>
        </section>
    );
}

export default NewProduct;
