import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import AppContext from '../../context'
import { appUrls, requestUrls } from '../../urls'
import UserAvatar from '../../components/UserAvatar/UserAvatar'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Button from '../../components/Button/Button'
import Loader from '../../components/Loader/Loader'
import styles from './UserView.module.scss'

class UserView extends Component{

    state = {
        username: '',
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
        const username = window.location.pathname.replace('/user/','').replace(/%20/g, " ")
        
        fetch(requestUrls.GET_USER_BY_USERNAME, {
            method: 'POST',
            body: JSON.stringify({ "username": `${username}` }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                return res.json()

            } else {
                const error = new Error(res.status)
                throw error
            }
        })
        .then(([data]) => {
            this.updateState(data)
        })
        .catch()
    }
    

    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location) {
            this.uptadeProfileInfo()    
        }
    }
    componentDidMount() {
        this.uptadeProfileInfo() 
    }

    render(){
        const {username, image, town, skis, level} =this.state
        return(
            <AppContext.Consumer>
                {(context)=>(
                    (window.location.pathname === "/user" || window.location.pathname === "/user/") ?
                    (<Redirect to={`/user/${context.user.username}`} />
                    ):(
                        this.state.username.length > 0 ?
                        <div className={styles.wrapper}>
                            <UserAvatar 
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
                                    onClick={()=>this.props.history.push(appUrls.EDIT_PROFILE)}
                                >
                                EDYTUJ PROFIL
                                </Button>
                            )}  
                           
                        </div>
                        :
                        <Loader />
                    )
                )}
            </AppContext.Consumer>
        )
    }
}
export default withRouter(UserView)
