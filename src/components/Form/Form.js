import React from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../context'
import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from './Form.module.scss'

const Form = ({formSubmitFnc, handleInputChange, formType})=>{
    return(
        <AppContext.Consumer>
            {(context)=>(
                <form className={styles.formWrapper}>
                    {formType==='register' && 
                        <Input
                            name='username'
                            type='text'
                            placeholder='NAZWA UŻYTKOWNIKA'
                            onChange={handleInputChange}
                            value={context.username}
                        />
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
                        secondary={true}
                        clickFn={formSubmitFnc}
                    >
                    {formType === 'login' ? 'ZALOGUJ' : 'ZAREJESTRUJ SIĘ'}
                    </Button>
                    
                </form> 

            )}
        </AppContext.Consumer>
    )
}
Form.propTypes = {
    formType: PropTypes.string,
    formSubmitFnc: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
}

export default Form
