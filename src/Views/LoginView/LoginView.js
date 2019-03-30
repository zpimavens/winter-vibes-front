import React from 'react';
import styles from './LoginView.module.scss';
import Form from '../../components/Form/Form';
import AppContext from '../../context';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import FormErrors from '../../components/Form/FormErrors';

class LoginView extends React.Component{

    state={
        email: '',
        password: '',
        formErrors: {
            login: '',
        }
        
    }
    
    handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push('/');
                    this.props.fetchUserData();
                    
                } else {
                    const error = new Error(res.status);
                    this.setState({formErrors: {login: 'Niepoprawne dane logowania.'}});
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }
    componentDidMount(){
    }

    render(){

        const data = {
            ...this.state,
        }
        return(
            <AppContext.Provider value={data}>
            
                    <div className={styles.wrapper}>
                        <Logo 
                            logoType='bigVertical'/>

                        <FormErrors formErrors={this.state.formErrors} />
                        <Form
                            formSubmitFnc={this.handleLogin}
                            handleInputChange={this.handleInputChange}
                            formType='login'
                        />
                        <Link className={styles.link} to='/register'>NIE MASZ KONTA? ZAREJESTRUJ SIĘ</Link>
                    </div>
                
            </AppContext.Provider>
        )
    }
}

export default LoginView;