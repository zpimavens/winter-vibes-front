import React from 'react'

import styles from './Checkbox.module.scss'

const Checkbox = ({ name, label, ...props }) =>(

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

export default Checkbox