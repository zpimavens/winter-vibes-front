import React from 'react';
import Input from '../Input/Input';
import styles from './Form.module.scss';
import Button from '../Button/Button';


const Form = ({formSubmitFnc, handleInputChange, formType})=>{
    return(
        <form className={styles.formWrapper}>
            
            {formType==='register' ? 
                (
                    <Input
                        name='username'
                        type='text'
                        placeholder='NAZWA UŻYTKOWNIKA'
                        onChange={handleInputChange}
                    />
                ):(
                    null
                )
            }
            <Input
                name='email'
                placeholder='E-MAIL'
                onChange={handleInputChange}
            />
            <Input
                name='password'
                placeholder='HASŁO'
                type='password'
                onChange={handleInputChange}
            />
            <Button
                secondary='true'
                clickFn={formSubmitFnc}
            >
            {formType === 'login' ? 'ZALOGUJ' : 'Zarejestruj się'}
            </Button>
            
        </form> 
    )
}
export default Form;