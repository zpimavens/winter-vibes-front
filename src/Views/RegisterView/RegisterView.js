import React, {Component} from 'react';
import styles from './RegisterView.module.scss';
import Form from '../../components/Form/Form';
import Logo from '../../components/Logo/Logo';
import AppContext from '../../context';
import {Link} from 'react-router-dom';

//form validation!
class RegisterView extends Component{
    
    state={
        email: '',
        username: '',
        password: '',

    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleRegister = (e) => {
        e.preventDefault();
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push('/user');
                } else {
                    const error = new Error(res.status);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                
            });
    };
    render(){

    
    return(
        <AppContext.Consumer>
            {(context)=>(
                <div className={styles.wrapper}>
                    <Logo 
                        logoType='bigVertical'
                    />
                    <Form 
                        formType='register'
                        handleInputChange={this.handleInputChange}
                        formSubmitFnc={this.handleRegister}
                    />
                    <Link className={styles.link} to='/login'>ZALOGUJ SIĘ</Link>
                </div>
            )}
        </AppContext.Consumer>
    )}
};

export default RegisterView;