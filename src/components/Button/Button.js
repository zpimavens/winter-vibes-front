import React from 'react';
import styles from './Button.module.scss';

const Button = ({children, secondary, clickFn, ...props}) =>{

    return(
        <button className={ secondary ? styles.buttonSecondary : styles.button}
        onClick={clickFn}
        {...props}
        >
            {children}
        </button>
    )
};

export default Button ;