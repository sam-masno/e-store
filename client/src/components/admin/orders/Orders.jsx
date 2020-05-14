import React, { useEffect, useState } from 'react';

//components
import adminOnly from 'components/auth/HOCs/adminOnly';
import Order from 'components/admin/orders/Order';

//services
import { getOrders } from 'services/orders';

//utils
import statusFields from 'utils/statusFields'

import Layout from 'components/layout/Layout';



const Orders = () => {
    const [orders, setOrders] = useState([])
    const [pages, setPages] = useState({loading: true})
    const [params, setParams] = useState({ filter:'Not processed', page: 1});
    const { filter, page } = params;
    const { error, loading, nextPage, previousPage } = pages;

    useEffect(() => {
        let mnt = true
        getOrders(filter, page, (err, result) => {
            if(err) {
                return setPages({error: result,loading: false})
            } 
            const { data, total, nextPage, previousPage } = result
            if(mnt) {
                setPages({ loading: false, total, nextPage, previousPage })
                return setOrders(data);
            }
        })
        return () => mnt = false
    }, [filter, page])

    //change status fuilter on change
    const handleFilter = event => {
        setParams({filter: event.target.value, page: 1});
        setPages({loading: true})
    }

    const Filter = () => (
        <div className="form-group py-5 col-12 col-md-9 mx-auto">
            <h3>Order management</h3>
            <h4 className="text-primary">View orders by status</h4>
            <select onChange={handleFilter} value={ filter } className="form-control">
                { statusFields.map(field => (
                    <option key={field} value={ field } className="form-control">{ field }</option>
                ))}
            </select>
        </div>
        
    )

    const Pagination = () => {
        return (
            <div className="d-flex justify-content-center py-3">
                <nav aria-label="Page navigation  text-center ">
                    <ul className="pagination text-center mx-auto">
                        { previousPage && (
                            <li className="page-item">
                                <button className="page-link bg-info" 
                                    onClick={ () => { setParams({...params,  page: previousPage}); 
                                    setPages({...pages, loading: true})
                                    }}
                            ><span className="fas fa-arrow-left text-white"></span></button></li>
                        )}

                                <li className="page-item"><button className="page-link">{ page } / { Math.ceil(pages.total / 2) } </button></li>

                        { nextPage && (
                                <li className="page-item">
                                    <button className="page-link bg-info" 
                                        onClick={ () => { setParams({...params,  page: nextPage}); 
                                        setPages({...pages, loading: true})
                                        }}
                                    >
                                        <span className="fas fa-arrow-right text-white"></span>
                                    </button>
                                </li>

                        )}
                    </ul>
                </nav>
            </div>
        )
    }


    const Results = () => {
        if(loading) {
            return <div className="py-5 col-12 col-md-9 mx-auto text-center"> <h4>Loading</h4> </div>
        }
        
        if(error) return <div className="py-5 text-danger text-center"> <h4>{ error }</h4> </div>

        if(orders.length === 0) return <div className="py-5 col-12 col-md-9 mx-auto text-center"><h4>No orders</h4></div>

        return (
            <div className="col-12 col-md-9 mx-auto">
                {orders.map(order => <Order key={order._id} order={order} admin={true}/> )}
                <Pagination />
            </div>
        )
    }

    


    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <Filter />
                    <Results />
                </div>
            </div>
        </Layout>
    );
}

export default adminOnly(Orders);
