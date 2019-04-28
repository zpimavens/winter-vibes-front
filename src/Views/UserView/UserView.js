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
        skis: '',                              
        level: 0, 
        town: '',                   
    }

    updateState = (data) => {
        this.setState({
            username: data.username,
            skis: data.skis,
            level: data.level,
            image: data.image,
            town: data.town,
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
                return res.json();

            } else {
                const error = new Error(res.status);
                throw error;
            }
        })
        .then(([data]) => {
            this.updateState(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location) {
            this.uptadeProfileInfo();    
        }
    }
    componentDidMount() {
        this.uptadeProfileInfo(); 
    };

    render(){
        const {username, image, town, skis, level} =this.state;
        return(
            <AppContext.Consumer>
                {(context)=>(
                    (window.location.pathname === "/user" || window.location.pathname === "/user/") ?
                    (<Redirect to={`/user/${context.user.username}`} />
                    ):(
                        <div className={styles.wrapper}>
                            <UserAvatar 
                                avatarType='profileType'
                                username={username}
                                image={image}
                            />
                            <p>{town}</p>
                            <p>{skis}</p>
                            <p>Umiejętności:</p>
                            <ProgressBar 
                                progress={level}
                            />
                            {context.user.username===username && (
                                <Button 
                                    clickFn={()=>this.props.history.push('/editprofile')}
                                >
                                EDYTUJ PROFIL
                                </Button>
                            )}  
                        </div>
                    )
                )}
            </AppContext.Consumer>
        )
    }
};
export default UserView;