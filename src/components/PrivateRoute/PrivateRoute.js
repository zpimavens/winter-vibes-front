import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { requestUrls } from '../../urls'

class PrivateRoute extends React.Component {
    state = {
        loading: true,
        isAuthenticated: false,
    }
    checkToken = ()=>{
        fetch(requestUrls.CHECK_TOKEN)
        .then((res) => {
            this.setState({
                loading: false,
                isAuthenticated: res.status===200,
            })
        })
        .catch()
    }
    componentDidMount() {
        this.checkToken()
    }
    
    render() {
        const { component: Component, ...rest } = this.props
        if (this.state.loading) {
            return null
        } else {
            return (
                <Route {...rest} render={props => (
                    <>
                        {!this.state.isAuthenticated && <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />}
                        <Component {...rest} />
                    </>
                )}
                />
            )
        }
    }
}
PrivateRoute.propTypes={
    component: PropTypes.func.isRequired,
}

export default PrivateRoute
