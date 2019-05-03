import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AppContext from '../../context'
import { appUrls, requestUrls } from '../../urls'
import Form from '../../components/Form/Form'
import FormMessages from '../../components/Form/FormMessages'
import Logo from '../../components/Logo/Logo'
import styles from './RegisterView.module.scss'

class RegisterView extends Component{
    
    state={
        email: '',
        username: '',
        password: '',
        formMessages: { email: '', password: '' , username: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false,
    }

    validateField(fieldName, value){
        let fieldValidationErrors = this.state.formMessages
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid

        switch (fieldName) {
            
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                fieldValidationErrors.email = emailValid ? '' : 'Niepoprawny adres email.'
                break
            case 'password':
                passwordValid = value.length >= 6
                fieldValidationErrors.password = passwordValid ? '' : 'Hasło jest za krótkie, min 6 znaków.'
                break
            default:
                break
        }

        this.setState({
            formMessages: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm)
    }
    

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid })
    }

    handleInputChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name]: value },
           ()=> this.validateField(name, value))
    }

    handleRegister = (e) => {
        e.preventDefault()
        const { formMessages, emailValid, passwordValid, formValid, ...userData} = this.state 
        if(this.state.formValid){
            
            fetch(requestUrls.REGISTER, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push(appUrls.REGISTER_SUCCESS)
                    
                } else if (res.status === 501) {
                    this.setState({ formMessages: {email: 'Istnieje już taki email'}})
                } 
                else if (res.status === 502) {
                    this.setState({ formMessages: {username: 'Istnieje już taka nazwa użytkownika'}})
                } 
            })
        }
    }

    
    render(){
    const data = {
        ...this.state,
    }
    return(
        <AppContext.Provider value={data}>
            <div className={styles.wrapper}>
                <Logo 
                    logoType='bigVertical'
                />
                <FormMessages 
                    formMessages={this.state.formMessages} 
                />
                <Form 
                    formType='register'
                    handleInputChange={this.handleInputChange}
                    formSubmitFnc={this.handleRegister}
                />
                <Link 
                    className={styles.link} 
                    to={appUrls.LOGIN}
                >
                ZALOGUJ SIĘ
                </Link>
            </div>
        </AppContext.Provider>
    )}
}

export default withRouter(RegisterView)
