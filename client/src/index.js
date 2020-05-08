import React from 'react';
import ReactDom from 'react-dom';

//router stuff
import { BrowserRouter } from 'react-router-dom'

//redux provider hoc
import Root from 'Root';

//components
import App from 'components/App';



ReactDom.render(

    <Root>
        <BrowserRouter>
            <App />
        </BrowserRouter>        
    </Root>    
    ,
    document.getElementById('root')
)