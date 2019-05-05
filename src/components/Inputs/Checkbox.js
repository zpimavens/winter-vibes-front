import React from 'react'
import PropTypes from 'prop-types'
import styles from './Checkbox.module.scss'

const CheckBox = ({ name, label, ...props }) =>(

    <label htmlFor={name}>
        <input
            className={styles.checkbox}
            name={name}
            id={name}
            type='checkbox'
            {...props}
        >
        </input>
        {label}
    </label>
   
)
CheckBox.propTypes={
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
export default CheckBox
