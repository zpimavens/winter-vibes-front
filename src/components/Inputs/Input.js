import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'

const Input = ({ name, type, placeholder, ...props }) =>{

    const Tag = type === 'textarea' ? 'textarea' : 'input'
    const style = type === 'textarea' ? styles.textArea : styles.formItem

    return(
        <>
       
            <Tag
                className={style}
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                {...props}
            > 
            </Tag>
       
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
