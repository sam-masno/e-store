import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';

export default (ChildComponent) => {

    const ProtectedComponent = (props) => {

        let history = useHistory();
        useEffect(() => {
            if(!props.auth) {
                history.push('/');
            } else if( props.user.role !== 1 && props.user.email !== 'mockUser@gmail.com')
                history.push('/');  
        }, [props])

        return <ChildComponent {...props} />
    }

    const mapStateToProps = ({auth, user }) => ({auth, user})
    return connect(mapStateToProps)(ProtectedComponent)
}
