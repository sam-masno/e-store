import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

export default (ChildComponent) => {

    const ProtectedComponent = (props) => {

        let history = useHistory();
        useEffect(() => {
            if(props.auth) {
                history.push('/dashboard');
            }
        }, [props])

        return <ChildComponent {...props} />
    }

    const mapStateToProps = ({auth}) => ({auth})
    return connect(mapStateToProps)(ProtectedComponent)
}


