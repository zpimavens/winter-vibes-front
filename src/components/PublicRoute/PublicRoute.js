import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { appUrls } from '../../urls'
import { isLoggedIn } from '../AuthService'

const PublicRoute = ({ component: Component, ...rest })=>{
    return (
        <Route {...rest} render={props => (
            isLoggedIn() ? <Redirect to={appUrls.ROOT} /> : <Component {...rest} />
        )}
        />
    )
}

PublicRoute.propTypes={
    component: PropTypes.any.isRequired,
}
export default PublicRoute
