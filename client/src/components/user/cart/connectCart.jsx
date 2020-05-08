import React, { useEffect } from 'react';

import * as actions from 'actions';
import { connect } from 'react-redux';

export default (ChildComponent) => {

    const CartComponent = (props) => {

        return <ChildComponent {...props} />
    }

    const mapStateToProps = ({ cart }) => ({ cart })
    return connect(mapStateToProps, actions)(CartComponent)
}
