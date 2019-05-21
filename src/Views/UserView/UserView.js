import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AppContext from '../../context'
import { appUrls, requestUrls } from '../../urls'
import Page404 from '../Page404/Page404'
import UserAvatar from '../../components/UserAvatar/UserAvatar'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Button from '../../components/Button/Button'
import Loader from '../../components/Loader/Loader'
import { FaSkiing, FaMapMarkerAlt } from 'react-icons/fa'
import styles from './UserView.module.scss'

class UserView extends Component{

    state = {
        username: '',
        image: '',
        skis: '',                              
        level: 0, 
        town: '',    
        userFound: true,               
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

            }else if(res.status === 404){
                this.setState({
                    userFound: false,
                })
            }
        })
        .then((data) => {
            if(data && data.length > 0)
            this.updateState(...data)
        })
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
        const {username, image, town, skis, level} = this.state
        return(
            <AppContext.Consumer>
                {(context)=>(
                    (!this.state.userFound) ?
                    (<Page404/>
                    ):(
                        this.state.username.length > 0 ?
                        <div className={styles.wrapper}>
                            <UserAvatar 
                                username={username}
                                image={image}
                            />
                            {town && <p><FaMapMarkerAlt />&ensp;{town}</p>}
                            {skis && <p><FaSkiing/> &ensp;{skis}</p>}
                            <p>Umiejętności:</p>
                            <ProgressBar 
                                progress={level}
                            />
                            {context.user.username===username ? (
                                <Button 
                                    onClick={()=>this.props.history.push(appUrls.EDIT_PROFILE)}
                                >
                                EDYTUJ PROFIL
                                </Button>
                            ):(
                                <div className={styles.buttonWrapper}>
                                <Button
                                    onClick={()=>alert('Coming soon!')}
                                >OBSERWUJ</Button>
                                
                                <Button
                                    onClick={() => alert('Coming soon!')}
                                >DODAJ DO GRUPY</Button>
                                </div>
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
