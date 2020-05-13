import React from 'react';
import Layout from '../layout/Layout';

import NewProduct from 'components/main/NewProduct';
import NewSection from 'components/main/NewSection'
import TopSellers from 'components/main/TopSellers';
import Browse from 'components/main/Browse';

const Home = () => {
  
    return (
        <div>
            <Layout title={"E-Store"} description={"Buy stuff here"} className="py-0">
                <NewProduct />
                <NewSection />
                <TopSellers />
                <Browse />
            </Layout>
        </div>
    );
}

export default Home;
