import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Button from '../../components/Button/Button';

import styles from './UserView.module.scss';


class UserView extends Component{

    state={
        username: 'Tosica97',      
        image: 'https://source.unsplash.com/random/400x400',        //image url
        skis: 'Volkl AURORA',                               //skis name - string
        level: '70',                 //min 0 max 100%
        visited: [                   //list of visited arenas       

        ],
    }

    componentDidMount(){
        //update user info, fetch stuff
    };
    //function for profile editing


    //display visited areanas, 

    render(){
        return(
            <>
            <Header/>
            <div className={styles.wrapper}>
                <div>
                    <UserAvatar 
                        avatarType='profile'
                    />
                    <p>{this.state.skis}</p>
                    <p>Umiejętności:</p>
                    <ProgressBar 
                        progress={this.state.level}
                    />
                    <Button >EDYTUJ PROFIL</Button>

                </div>
            </div>
            </>
        )
    }
};
export default UserView;