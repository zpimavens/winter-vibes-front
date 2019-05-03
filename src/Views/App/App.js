import React from 'react'
import { Switch, withRouter} from 'react-router-dom'
import AppContext from '../../context'
import { appUrls, requestUrls } from '../../urls'

import Header from '../../components/Header/Header'
import UserView from '../UserView/UserView'
import MainView from '../MainView/MainView'
import SkiAreaSearchView from '../SkiAreaSearchView/SkiAreaSearchView'
import LoginView from '../LoginView/LoginView'
import RegisterView from '../RegisterView/RegisterView'
import UsersSearchView from '../../Views/UsersSearchView/UsersSearchView'
import ActivationView from '../ActivationView/ActivationView'
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute'
import PublicRoute from '../../components/PublicRoute/PublicRoute'
import RegisterDoneView from '../../Views/RegisterDoneView/RegisterDoneView'
import EditProfileView from '../EditProfileView/EditProfileView'
import '../../assets/styles/index.scss'


class App extends React.Component{

    state={
        user: {
            username: '',
            image: '',
            logged: '',
        },
    }

    handleLogOut = (e) => {
        e.preventDefault()
        fetch(requestUrls.LOGOUT, {
            method: 'POST',
            body: '',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({
                    user: {logged: false}
                })
                this.props.history.push(appUrls.LOGIN)
            }
        })
    }


    fetchUserData= ()=>{
        fetch(requestUrls.CURRENT_USER)
        .then(response => {
            if(response.status===200)
                return response.json()
            else
                throw new Error(response.status)
        })
        .then(([data]) => {
            this.setState({
                user: {
                    username: data.username,
                    image: data.image,
                    logged: true,
                }
            })
        })
        .catch()
    }
    componentDidMount() {

        fetch(requestUrls.CHECK_TOKEN)
        .then(res =>{
            if ( res.status === 200){
                this.fetchUserData()
            }}
        ) 
    }

    render(){   

        const contextElements = {
            ...this.state,
            handleLogOut: this.handleLogOut,
            history: this.props.history,
        }

        return(
            <AppContext.Provider value={contextElements}>   
                {this.state.user.logged && <Header /> }
                <Switch>
                    <PrivateRoute 
                        exact path={appUrls.ROOT} 
                        component={MainView}
                    />
                    <PublicRoute 
                        path={appUrls.LOGIN} 
                        component={LoginView} 
                        fetchUserData={this.fetchUserData} 
                        history={this.props.history}
                    />
                    <PublicRoute 
                        path={appUrls.REGISTER} 
                        component={RegisterView} 
                        history={this.props.history}
                    />
                    <PublicRoute 
                        path={appUrls.ACTIVATE}
                        component={ActivationView} 
                    />
                    <PublicRoute 
                        path={appUrls.REGISTER_SUCCESS}
                        component={RegisterDoneView} 
                    />
                    <PrivateRoute 
                        path={appUrls.USER}
                        component={UserView} 
                        history={this.props.history} 
                        user={this.state.user}
                    />
                    <PrivateRoute 
                        path={appUrls.SEARCH_AREAS} 
                        component={SkiAreaSearchView} 
                    />
                    <PrivateRoute 
                        path={appUrls.SEARCH_USERS} 
                        component={UsersSearchView} 
                    />
                    <PrivateRoute 
                        path={appUrls.EDIT_PROFILE} 
                        component={EditProfileView} 
                    />
                </Switch>
            </AppContext.Provider>    
        )
    }
}

export default withRouter(App)
