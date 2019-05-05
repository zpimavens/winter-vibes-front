import React from 'react'
import PropTypes from 'prop-types'
import styles from './DropDown.module.scss'

const DropDown = ({ options, placeholder, ...props })=>{
    return(
        <select 
            className={styles.wrapper}
            {...props}
        >
            <option value='' >{placeholder}</option>
            {options.map(el=>{
                return <option key={el} value={el}>{el}</option>
            })}
        </select>
        
    )
}

DropDown.propTypes={
    // name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string
}
export default DropDown
