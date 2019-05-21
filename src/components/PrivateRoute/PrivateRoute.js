import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isLoggedIn } from '../AuthService'
import { appUrls } from '../../urls'

const PrivateRoute = ({ component: Component, layout: Layout,...rest }) => {
    return (
        <Route {...rest} render={props => (
            !isLoggedIn() ? <Redirect to={appUrls.LOGIN} /> 
            : 
            Layout ? <><Layout/><Component {...rest}/></>:
            <Component {...rest} />
        )}
        />
    )
}

PrivateRoute.propTypes={
    component: PropTypes.any.isRequired,
}

export default PrivateRoute
