import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const token = true;
const PrivateRoute = ({component: Component, ...rest})=>{

return(
    
    <Route {...rest} render={(props) => (
        token === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
    
)
}

export default PrivateRoute;
