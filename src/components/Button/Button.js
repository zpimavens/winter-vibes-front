import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'

const Button = ({ secondary, clickFn, children, ...props}) =>{

    return(
        <button 
            className={ secondary ? styles.buttonSecondary : styles.button}
            onClick={clickFn}
            {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    secondary: PropTypes.bool,
    clickFn: PropTypes.func.isRequired,
}
Button.defaultProps = {
    secondary: false,
}

export default Button
