import React from 'react';
import styles from './Button.module.scss';

const Button = ({children, secondary, clickFn}) =>{

    return(
        <button className={ secondary ? styles.buttonSecondary : styles.button}
        onClick={clickFn}>
            {children}
        </button>
    )
};

export default Button ;