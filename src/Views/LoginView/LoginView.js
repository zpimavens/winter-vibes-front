import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppContext from '../../context'
import { appUrls, requestUrls } from '../../urls'
import Form from '../../components/Form/Form'
import Logo from '../../components/Logo/Logo'
import FormMessages from '../../components/Form/FormMessages'
import styles from './LoginView.module.scss'

class LoginView extends React.Component{
    state={
        email: '',
        password: '',
        formMessages: {
            login: '',
        }
    }
    
    handleLogin = (e) => {
        e.preventDefault()
        const { formMessages, ...userData } = this.state
        
        fetch(requestUrls.LOGIN, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.props.history.push(appUrls.ROOT)
                this.props.fetchUserData()
                
            } else {
                if(res.status===401)
                    this.setState({formMessages: {login: 'Niepoprawne dane logowania.'}})
                else{
                    this.setState({ formMessages: { login: 'Coś poszło nie tak. Spróbuj ponownie później.' } })
                }
            }
        })
    }

    handleInputChange = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value
        })
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
                            formSubmitFnc={this.handleLogin}
                            handleInputChange={this.handleInputChange}
                            formType='login'
                        />
                        <Link 
                            className={styles.link} 
                            to={appUrls.REGISTER}
                        >
                        NIE MASZ KONTA? ZAREJESTRUJ SIĘ
                        </Link>
                    </div> 
            </AppContext.Provider>
        )
    }
}
LoginView.propTypes={
    fetchUserData: PropTypes.func.isRequired,
}

export default withRouter(LoginView)
