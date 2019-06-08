import React from 'react'
import { Route, Switch, withRouter} from 'react-router-dom'
import AppContext from '../../context'
import { isLoggedIn, logout } from '../../components/AuthService'
import { appUrls, requestUrls } from '../../urls'
import Header from '../../components/Header/Header'
import UserView from '../UserView/UserView'
import MyGroupsView from '../MyGroupsView/MyGroupsView'
import GroupView from '../GroupView/GroupView'
import SkiAreaSearchView from '../SkiAreaSearchView/SkiAreaSearchView'
import LoginView from '../LoginView/LoginView'
import RegisterView from '../RegisterView/RegisterView'
import CommunitySearchView from '../../Views/CommunitySearchView/CommunitySearchView'
import ActivationView from '../ActivationView/ActivationView'
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute'
import PublicRoute from '../../components/PublicRoute/PublicRoute'
import RegisterDoneView from '../../Views/RegisterDoneView/RegisterDoneView'
import EditProfileView from '../EditProfileView/EditProfileView'
import SkiAreaView from '../SkiAreaView/SkiAreaView'
import Page404 from '../Page404/Page404'
import '../../assets/styles/index.scss'
import Loader from '../../components/Loader/Loader';

class App extends React.Component{

    state={
        user: {
            username: '',
            image: '',
        },
        isLoading: false
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

    fetchUserData= (usern)=>{
      const username = usern
      this.setState({
        isLoading: true
      })

      fetch(requestUrls.GET_USER_BY_USERNAME, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username}),

        })
        .then(response => {
            if(response.status===200)
                return response.json()
            else
                throw new Error(response.status)
        })
        .then(([data]) => {
            this.updateStateData(data)

        })
        .catch()
    }

    updateStateData = (data)=>{
      this.setState({
        user:{
          username: data.username,
          image: data.image
        },
        isLoading: false
      })      
    }
    updateUserData=()=>{
      this.setState({
        isLoading: true
      })
      fetch(requestUrls.CURRENT_USER)
        .then(response => {
          if (response.status === 200)
            return response.json()
          else
            throw new Error(response.status)
        })
        .then(([data]) => {
          this.updateStateData(data)
        })
        .catch()
    }

    checkToken = ()=>{
      if (isLoggedIn())
        this.updateUserData()
    }

    componentDidMount() {
      this.checkToken()
    }

    render(){   

        const contextElements = {
            user:{
                username: this.state.user.username,
                image: this.state.user.image
            }
            ,
            handleLogOut: this.handleLogOut,
        }

        return (
          this.state.isLoading ? <Loader /> :
          <AppContext.Provider value={contextElements}>
            <Switch>
              <PrivateRoute
                exact
                path={appUrls.ROOT}
                component={MyGroupsView}
                layout={Header}
              />
              <PublicRoute
                path={appUrls.LOGIN}
                component={LoginView}
                loadUserData={this.fetchUserData}
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
                path={appUrls.USER_ID}
                component={UserView}
                user={this.state.user}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.GROUP_ID}
                component={GroupView}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.SEARCH_AREAS}
                component={SkiAreaSearchView}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.AREA_ID}
                component={SkiAreaView}
                layout={Header}
              />
              <PrivateRoute
                path={appUrls.SEARCH_USERS}
                component={CommunitySearchView}
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
