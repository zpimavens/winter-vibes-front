import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { appUrls, requestUrls } from '../../urls'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Button/Button'
import FormMessages from '../../components/Form/FormMessages'
import styles from './EditProfileView.module.scss'

class EditProfileView extends Component {

    state = {
        username: '',
        skis: '',
        level: 0,
        town: '',
        formMessages: {
            else: '',
        },
        messageType: 'error'

    }
    handleInputChange = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value
        })
    }
    
    fetchUserData = ()=>{
        fetch(requestUrls.CURRENT_USER)
        .then(res => {
            if (res.status === 200) return res.json()
            else throw new Error(res.status)
        })
        .then(([data]) => {
            this.setState({
                username: data.username,
                skis: data.skis,
                level: data.level,
                town: data.town
            })
        })
        .catch()
    }
   handleProfileUpdate = (e) => {
       e.preventDefault()
       const { formMessages, messageType, ...userData } = this.state
       
       fetch(requestUrls.EDIT_USER, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({ 
                    formMessages: { else: 'Pomyślnie zmieniono Twoje dane :)' }, 
                    messageType: 'confirm',    
                })

            } else {                
                this.setState({
                    formMessages: {else: 'Coś poszło nie tak. Spróbuj ponownie.'},
                    messageType: 'error'
                })

            }
        })
        
   }
   componentDidMount(){
       this.fetchUserData()
   }

    render(){
        return(
            <div className={styles.container}>
                <form className={styles.formWrapper}>
                <h3 className={styles.formTitle}>Podaj dane do zmiany:</h3>
                <FormMessages 
                    formMessages={this.state.formMessages}
                    messageType={this.state.messageType}
                />
                    <Input
                        name="skis"
                        id="skis"
                        type='text'
                        placeholder="Nazwa nart"
                        value={this.state.skis}
                        onChange={this.handleInputChange}
                    />
                    <Input
                        name="town"
                        id="town"
                        type='text'
                        placeholder="Miasto"
                        value={this.state.town}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="level">Poziom umiejętności: {this.state.level}</label>
                    <Input
                        className={styles.slider}
                        name="level"
                        id="level"
                        type='range'
                        value={this.state.level}
                        min='0'
                        max='10'
                        onChange={this.handleInputChange}
                    />
                    <Button
                        onClick={this.handleProfileUpdate}
                    >
                        ZAPISZ ZMIANY
                    </Button>
                </form>
                <Button
                    onClick={()=>this.props.history.push(appUrls.USER+this.state.username)}
                >
                    WRÓĆ DO PROFILU
                </Button>
            </div>
        )
    }
}

export default withRouter(EditProfileView)
