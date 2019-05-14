import React from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'
import AppContext from '../../context'
import { isLoggedIn, logout } from '../../components/AuthService'
import { appUrls, requestUrls } from '../../urls'
import Header from '../../components/Header/Header'
import UserView from '../UserView/UserView'
import GroupsView from '../GroupsView/GroupsView'
import SkiAreaSearchView from '../SkiAreaSearchView/SkiAreaSearchView'
import LoginView from '../LoginView/LoginView'
import RegisterView from '../RegisterView/RegisterView'
import UsersSearchView from '../../Views/UsersSearchView/UsersSearchView'
import ActivationView from '../ActivationView/ActivationView'
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute'
import PublicRoute from '../../components/PublicRoute/PublicRoute'
import RegisterDoneView from '../../Views/RegisterDoneView/RegisterDoneView'
import EditProfileView from '../EditProfileView/EditProfileView'
import SkiAreaView from '../SkiAreaView/SkiAreaView'
import Page404 from '../Page404/Page404'
import '../../assets/styles/index.scss'

class App extends React.Component{

    state={
        user: {
            username: '',
            image: '',
        },
    }

    handleLogOut = (e) => {
        e.preventDefault()
        logout()
        this.setState({
          user: {
            username: '',
            image: '',
        },
        })
        this.props.history.push(appUrls.LOGIN)
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
            this.updateUserData(data)
            // console.log(data)
        })
        .catch()
    }

    updateUserData = (data)=>{
      this.setState({
        user: data
      })
    }

    checkToken = ()=>{
      if (isLoggedIn())
        this.fetchUserData()
    }

    componentDidMount() {
      this.checkToken()
    }

    render(){   

        const contextElements = {
            ...this.state,
            handleLogOut: this.handleLogOut,
        }

        return (
          <AppContext.Provider value={contextElements}>
            <Switch>
              <PrivateRoute
                exact
                path={appUrls.ROOT}
                component={GroupsView}
                layout={Header}
              />
              <PublicRoute
                path={appUrls.LOGIN}
                component={LoginView}
                loadUserData={this.checkToken}

              />
              <PublicRoute
                path={appUrls.REGISTER}
                component={RegisterView}
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
                user={this.state.user}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.SEARCH_AREAS}
                component={SkiAreaSearchView}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.AREA}
                component={SkiAreaView}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.SEARCH_USERS}
                component={UsersSearchView}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.EDIT_PROFILE}
                component={EditProfileView}
                layout={Header}
              />
              <Route component={Page404}/>
            </Switch>
          </AppContext.Provider>
        )
    }
}

export default withRouter(App)
