import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppContext from '../../context'
import { appUrls } from '../../urls'
import { login } from '../../components/AuthService'
import Form from '../../components/Form/Form'
import Logo from '../../components/Logo/Logo'
import FormMessages from '../../components/Form/FormMessages'
import styles from './LoginView.module.scss'

class LoginView extends React.Component{
    state={
        username: '',
        password: '',
        formMessages: {
            msg: '',
        },
        isLoading: false,
    }

    handleLogin = (e) => {
        e.preventDefault()
        this.setState({
            isLoading: true
        })
        const { username, password } = this.state
        login(username, password)
        .then(res=>{
            this.props.history.replace(appUrls.ROOT)
            this.props.loadUserData(username) 
            
        })
        .catch(err=>{
            if(err.message==='Unauthorized')
                this.setState({
                    formMessages: {
                        msg: 'Niepoprawne dane logowania.'
                    },
                    isLoading: false
                })
            else
            this.setState({
                formMessages: {
                    msg: "Coś poszło nie tak, spróbuj ponownie później."
                },
                isLoading: false
            })
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
                            isLoading={this.state.isLoading}
                        />
                        <Link 
                            className={styles.link} 
                            to={appUrls.REGISTER}
                        >
                        Nie masz konta? Zarejestruj się!
                        </Link>
                    </div> 
            </AppContext.Provider>
        )
    }
}

LoginView.propTypes={
    loadUserData: PropTypes.func.isRequired,
}
export default withRouter(LoginView)
