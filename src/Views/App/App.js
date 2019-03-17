import React from 'react';
import './index.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AppContext from '../../context';

import withAuth from '../../withAuth';
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
    
    // logOut = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         isLoggedIn: false,
    //     });
    // };
    render(){   

        const contextElements = {
            ...this.state,
        }

        return(

            <>
            <BrowserRouter>
            <AppContext.Provider value={contextElements}>   
                <Switch>
                  <Route exact path='/' component={withAuth(MainView)}/>
                  <Route path='/login' component={LoginView} />
                  <Route path='/register' component={RegisterView} />
                  <Route path='/user' component={withAuth(UserView)} />
                  <Route path='/skiarea' component={withAuth(SkiAreaView)} />
                </Switch>
            </AppContext.Provider>    
            </BrowserRouter>
            </>
        )
    }

};

export default App;