import React from 'react'
import PropTypes from 'prop-types'
import styles from './SmallIconButton.module.scss'

const SmallIconButton = ({  children, ...props }) => {

    return (
        <button
            className={styles.wrapper}
            {...props}
        >
            {children}
        </button>
    )
}

SmallIconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}


export default SmallIconButton
