import React from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../context'
import Input from '../Inputs/Input'
import Button from '../Button/Button'
import styles from './Form.module.scss'

const Form = ({formSubmitFnc, handleInputChange, formType, autoComplete, isLoading})=>{
    return(
        <AppContext.Consumer>
            {(context)=>(
                <form 
                    className={styles.formWrapper}
                    autoComplete={autoComplete}
                >
                    
                    <Input
                        name='username'
                        type='text'
                        placeholder='NAZWA UŻYTKOWNIKA'
                        onChange={handleInputChange}
                        value={context.username}
                    />
                    {formType==='register' && 
                        <Input
                            name='email'
                            placeholder='E-MAIL'
                            type='email'
                            onChange={handleInputChange}
                            value={context.email}
                        /> 
                    }
                    <Input
                        name='password'
                        placeholder='HASŁO'
                        type='password'
                        onChange={handleInputChange}
                        value={context.password}
                    />
                    {formType==='register' && 
                        <Input
                            name='passwordRep'
                            placeholder='POWTÓRZ HASŁO'
                            type='password'
                            onChange={handleInputChange}
                            value={context.passwordRep}
                        />
                    }
                    <Button
                        secondary={true}
                        onClick={formSubmitFnc}
                        disabled={isLoading}
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
