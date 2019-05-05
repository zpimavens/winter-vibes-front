import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'

const Input = ({name, type, placeholder, ...props}) =>{

    return(
        <>
            <input
                className={styles.formItem}
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                //maxlength
                {...props}
            > 
            </input>
        </>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
}
Input.defaultProps = {
    type: 'text',
    placeholder: ' ',
}

export default Input
