import React from 'react';
import {Route, Redirect} from 'react-router-dom';


class PrivateRoute extends React.Component {
    state = {
        loading: true,
        isAuthenticated: false,
    }
    componentDidMount() {
        fetch('/checkToken')
        .then((res) => {
            this.setState({
                loading: false,
                isAuthenticated: res.status===200,
            });
        });
    }
    render() {
        const { component: Component, ...rest } = this.props;
        if (this.state.loading) {
            return null;
        } else {
            return (
                <Route {...rest} render={props => (
                    <div>
                        {!this.state.isAuthenticated && <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />}
                        <Component {...props} />
                    </div>
                )}
                />
            )
        }
    }
}
// const PrivateRoute = ({component: Component, ...rest})=>{
    
    
//    async function auth(){
       
//       const aut = await
//        fetch('/checkToken')
//         .then(res => {
            
//             return res.status===200
//         })
//         return aut;
//     }

// return(
    
//     <Route {...rest} render={(props) => (
//        auth()===true?  <Component {...props} /> : <Redirect to='/login' />
//     )} />
    
// )
// }

export default PrivateRoute;
