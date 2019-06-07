import React from 'react'
import PropTypes from 'prop-types'
import styles from './SmallIconButton.module.scss'

const SmallIconButton = ({  children, type, ...props }) => {

    var style;

    switch(type){
        case 'base':
            style=styles.wrapperBase
            break;
        case 'secondary':
            style=styles.wrapperSec
            break;
        case 'fixed':
            style=styles.wrapperFixed
            break;
        default:
            break
    }

    return (
        <button
            className={style}
            {...props}
        >
            {children}
        </button>
    )
}

SmallIconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['secondary','fixed','base']),
}
SmallIconButton.defaultProps={
    type: 'base',
}


export default SmallIconButton
