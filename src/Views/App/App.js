import React from 'react';
import './index.css';
import { Switch, withRouter} from 'react-router-dom';
import AppContext from '../../context';

import Header from '../../components/Header/Header';
import UserView from '../UserView/UserView';
import MainView from '../MainView/MainView';
import SkiAreaSearchView from '../SkiAreaSearchView/SkiAreaSearchView';
import LoginView from '../LoginView/LoginView';
import RegisterView from '../RegisterView/RegisterView';
import UsersSearchView from '../../Views/UsersSearchView/UsersSearchView';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import PublicRoute from '../../components/PublicRoute/PublicRoute';
import ActivationView from '../ActivationView/ActivationView';
import RegisterDoneView from '../../Views/RegisterDoneView/RegisterDoneView';
import EditProfileView from '../EditProfileView/EditProfileView';


class App extends React.Component{

    state={
        user: {
            username: '',
            image: '',
            logged: '',
        },
    };

    
     logOut = (e) => {
        e.preventDefault();
        fetch('/api/logOut', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        
                           user: {logged: false,}
                        
                    })
                    this.props.history.push('/login');
                } else {
                    const error = new Error(res.status);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
            });
    };


    fetchUserData= ()=>{
        fetch('/api/getCurrentUser')
            .then(response => {
                if(response.status===200)
                    return response.json();
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
            .catch(error=>(null));
    }
    componentDidMount() {
        if(fetch('/checkToken').then(res=>res.status===200)){
            this.fetchUserData();
        }
    }

    render(){   

        const contextElements = {
            ...this.state,
            logOut: this.logOut,
            history: this.props.history,
            
        }

        return(
            
            <>
            
            <AppContext.Provider value={contextElements}>   
                {this.state.user.logged && <Header /> }
                <Switch>
                  <PrivateRoute exact path='/' component={MainView}/>
                  <PublicRoute path='/login' component={LoginView} fetchUserData={this.fetchUserData} history={this.props.history}
                  />
                  <PublicRoute path='/register' component={RegisterView} history={this.props.history}/>
                  <PublicRoute path='/activate' component={ActivationView} />
                  <PublicRoute path='/registersuccess' component={RegisterDoneView} />

                  <PrivateRoute path='/user' component={UserView} history={this.props.history} user={this.state.user}/>
                  <PrivateRoute path='/search-areas' component={SkiAreaSearchView} />
                  <PrivateRoute path='/search-users' component={UsersSearchView} />
                  <PrivateRoute path='/editprofile' component={EditProfileView} />

                </Switch>
            
            </AppContext.Provider>    
           
            </>
        )
    }

};

export default withRouter(App);