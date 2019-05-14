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
        email: '',
        password: '',
        formMessages: {
            msg: '',
        }

    }

    handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = this.state
        
        login(email, password)
        .then(res=>{
            this.props.history.replace(appUrls.ROOT)
            this.props.loadUserData() 
        })
        .catch(err=>{
            if(err.message==='Unauthorized')
                this.setState({
                    formMessages: {
                        msg: 'Niepoprawne dane logowania.'
                    }
                })
            else
            this.setState({
                formMessages: {
                    msg: "Coś poszło nie tak, spróbuj ponownie później."
                }
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
    loadUserData: PropTypes.func.isRequired,
}
export default withRouter(LoginView)
