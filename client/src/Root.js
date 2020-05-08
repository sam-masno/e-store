import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//reducers
import rootReducer from 'reducers';

export default ({ children, initialState = {} }) => { 
    const store = createStore(rootReducer, initialState, composeWithDevTools());
    return (
        <Provider store={store} >

            { children }
            
        </Provider>
    )
}