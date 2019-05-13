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
        passwordRep: '',
        formMessages: { email: '', password: '' , username: '', other:''},
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
            case 'passwordRep':
                passwordValid = value.length >=6 && this.state.password===this.state.passwordRep
                fieldValidationErrors.password = value.length<6 ? 'Hasło jest za krótkie, min 6 znaków.' :
                    this.state.password!==this.state.passwordRep ? 'Hasła nie są identyczne.'  : ''
                break
            default:
                break
        }

        this.setState({
            formMessages: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
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
                if (res.status === 201) {
                    this.props.history.push(appUrls.REGISTER_SUCCESS)
                } else if (res.status === 409) {
                    return res.text()
                } 
                else if (res.status === 500) {
                    this.setState({ formMessages: {other: 'Coś poszło nie tak, spróbuj ponownie później.'}})
                } 
            })
            .then(data =>{
                if (data === 'email')
                    this.setState({ formMessages: { email: 'Istnieje już taki email' } })
                else if (data === 'username')
                    this.setState({ formMessages: { username: 'Istnieje już taka nazwa użytkownika' } })
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
                    autoComplete='off'
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
