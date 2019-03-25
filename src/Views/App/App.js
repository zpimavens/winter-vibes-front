import React from 'react';
import './index.css';
import { Route, Switch, withRouter} from 'react-router-dom';
import AppContext from '../../context';

import withAuth from '../../withAuth';
import Header from '../../components/Header/Header';
import UserView from '../UserView/UserView';
import MainView from '../MainView/MainView';
import SkiAreaView from '../SkiAreaView/SkiAreaView';
import LoginView from '../LoginView/LoginView';
import RegisterView from '../RegisterView/RegisterView';

import userImage from '../../assets/tosiaFoto.JPG';


class App extends React.Component{

    state={
        user: {
            username: 'Tosica97',
            image: userImage,
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

    
    render(){   

        const contextElements = {
            ...this.state,
            logOut: this.logOut,
            history: this.props.history,
        }

        return(
            
            <>
            
            <AppContext.Provider value={contextElements}>   
                 
                <Switch>
                  <Route exact path='/' component={withAuth(MainView)}/>
                  <Route path='/login' component={LoginView} />
                  <Route path='/register' component={RegisterView} />
                  <Route path='/user' component={withAuth(UserView)} />
                  <Route path='/skiarea' component={withAuth(SkiAreaView)} />
                </Switch>
            
            </AppContext.Provider>    
           
            </>
        )
    }

};

export default withRouter(App);