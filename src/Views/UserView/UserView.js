import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Button from '../../components/Button/Button';
import AppContext from '../../context';

import styles from './UserView.module.scss';


class UserView extends Component{

    
    state = {
        username: window.location.pathname.slice(6).replace(/%20/g, " "),
        image: '',
        skis: '',                               //skis name - string
        level: '', 
        city: '',                //min 0 max 100%
        visited: [                   //list of visited arenas       

        ],
        trophies: '',
        
    }

    updateState = (data) => {
        this.setState({
            username: data.username,
            skis: data.skis,
            level: data.level,
            image: data.image,
            city: data.city,
            visited: data.visited,
            trophies: data.trophies,
        })
        
    }
    uptadeProfileInfo=()=>{
        fetch('/api/getUserByLogin', {
            method: 'POST',
            body: JSON.stringify({ "username": `${window.location.pathname.slice(6).replace(/%20/g, " ")}` }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    //console.log(res.json());
                    return res.json();

                } else {
                    const error = new Error(res.status);
                    throw error;
                }
            })
            .then(([data]) => {
                this.updateState(data);
                // console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location) {
            // this.setState({
            //     username: window.location.pathname.slice(6).replace(/%20/g, " ")
            // })
            // // window.location.reload();
            this.uptadeProfileInfo();
            
        }
    }
    componentDidMount() {

        this.uptadeProfileInfo();
        
    };

    //function for profile editing

    //display visited areanas, 

    render(){
        return(
            <AppContext.Consumer>
                {(context)=>(
                    (window.location.pathname === "/user" || window.location.pathname === "/user/") ?
                    (<Redirect to={`/user/${context.user.username}`} />):(

                        <div className={styles.wrapper}>
                            <div>
                                <UserAvatar 
                                    avatarType='profile'
                                    //tu dać trzeba usera
                                    username={this.state.username}
                                    image={this.state.image}
                                />
                                <p>{this.state.city}</p>
                                <p>{this.state.skis}</p>
                                <p>Umiejętności:</p>
                                <ProgressBar 
                                    progress={this.state.level}
                                />
                                {
                                context.user.username===this.state.username ? 
                                ( 
                                <Button 
                                clickFn={()=>this.props.history.push('/editprofile')}
                                >EDYTUJ PROFIL</Button>
                                ):(
                                    null
                                )
                                }

                            </div>
                        </div>
                    )
                
                )}
            </AppContext.Consumer>
        )
    }
};
export default UserView;