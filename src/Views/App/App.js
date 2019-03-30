import React from 'react';
import './index.css';
import { Switch, withRouter} from 'react-router-dom';
import AppContext from '../../context';

import Header from '../../components/Header/Header';
import UserView from '../UserView/UserView';
import MainView from '../MainView/MainView';
import SkiAreaView from '../SkiAreaView/SkiAreaView';
import LoginView from '../LoginView/LoginView';
import RegisterView from '../RegisterView/RegisterView';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import PublicRoute from '../../components/PublicRoute/PublicRoute';


class App extends React.Component{

    state={
        user: {
            username: '',
            image: '',
            
        },
    };

    //update user info
    
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
                    return response.json();
            })
            .then(([data]) => {
                this.setState({
                    user: {
                        username: data.username,
                        image: data.image,
                        
                    }
                })
            })
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
                {/* <Header /> */}
                <Switch>
                  <PrivateRoute exact path='/' component={MainView}/>
                  <PublicRoute path='/login' component={LoginView} fetchUserData={this.fetchUserData} history={this.props.history}
                  />
                  <PublicRoute path='/register' component={RegisterView} />
                  <PrivateRoute path='/user' component={UserView} />
                  <PrivateRoute path='/skiarea' component={SkiAreaView} />
                </Switch>
            
            </AppContext.Provider>    
           
            </>
        )
    }

};

export default withRouter(App);