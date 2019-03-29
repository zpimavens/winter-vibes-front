import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Button from '../../components/Button/Button';

import styles from './UserView.module.scss';


class UserView extends Component{

    state = {
        skis: '',                               //skis name - string
        level: '',                 //min 0 max 100%
        visited: [                   //list of visited arenas       

        ],
    }
    updateState = (data) => {
        this.setState({
            skis: data.skis,
            level: data.level,
            visited: data.visited,
            trophies: data.trophies,
        })
    }

    componentDidMount() {

        fetch('/api/getCurrentUser')
            .then(function (response) {
                return response.json();
            })
            .then(([data]) => {
                this.setState({
                    skis: data.skis,
                    level: data.level,
                    visited: data.visited,
                    trophies: data.trophies,
                })
            })
            .catch(error => console.log(error));
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