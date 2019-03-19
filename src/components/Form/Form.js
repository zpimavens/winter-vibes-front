import React from 'react';
import Input from '../Input/Input';
import styles from './Form.module.scss';
import Button from '../Button/Button';
import AppContext from '../../context';


const Form = ({formSubmitFnc, handleInputChange, formType})=>{
    return(
        <AppContext.Consumer>
            {(context)=>(
                <form className={styles.formWrapper}>
                    
                    {formType==='register' ? 
                        (
                            <Input
                                name='username'
                                type='text'
                                
                                placeholder='NAZWA UŻYTKOWNIKA'
                                onChange={handleInputChange}
                                value={context.username}
                            />
                        ):(
                            null
                        )
                    }
                    <Input
                        name='email'
                        placeholder='E-MAIL'
                        type='email'
                        
                        onChange={handleInputChange}
                        value={context.email}
                    />
                    <Input
                        name='password'
                        placeholder='HASŁO'
                        type='password'
                        
                        onChange={handleInputChange}
                        value={context.password}
                    />
                    <Button
                        secondary='true'
                        clickFn={formSubmitFnc}
                    >
                    {formType === 'login' ? 'ZALOGUJ' : 'Zarejestruj się'}
                    </Button>
                    
                </form> 

            )}
        </AppContext.Consumer>
    )
}
export default Form;