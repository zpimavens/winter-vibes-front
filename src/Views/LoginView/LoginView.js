import React from 'react';
import styles from './LoginView.module.scss';
import Form from '../../components/Form/Form';
import AppContext from '../../context';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

class LoginView extends React.Component{

    state={
        email: '',
        password: ''
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
                } else {
                    const error = new Error(res.status);
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

    render(){

        return(
            <AppContext.Consumer>
            {(context)=>(
                    <div className={styles.wrapper}>
                        <Logo 
                            logoType='bigVertical'/>
                        <Form
                            formSubmitFnc={this.handleLogin}
                            handleInputChange={this.handleInputChange}
                            formType='login'
                        />
                        <Link className={styles.link} to='/register'>NIE MASZ KONTA? ZAREJESTRUJ SIĘ</Link>
                    </div>
                )}
            </AppContext.Consumer>
        )
    }
}

export default LoginView;