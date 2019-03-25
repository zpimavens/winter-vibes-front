import React, {Component} from 'react';
import Header from '../../components/Header/Header';

class UserView extends Component{

    state={
        username: 'Tosica97',
        image: 'https://source.unsplash.com/random/400x400',
        skis: 'Volkl AURORA',
        level: '7',                 //min 1 max 10
        trophies: [

        ],
        visited: [

        ],
    }
    

    componentDidMount(){
        //update user info
    };

    

    render(){
        return(
            <>
            <Header/>
            <h1>UserView</h1>
            </>
        )
    }
};
export default UserView;