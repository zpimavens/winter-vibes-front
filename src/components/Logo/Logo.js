import React from 'react';
import styles from './Logo.module.scss';
import logo from '../../assets/logo.png';

const Logo = ({logoType})=>{

    return(
        <div className={logoType==='bigVertical' ? styles.wrapperBig : styles.wrapperSmall}>
            <img src={logo} alt='WinterVibes logo.' className={logoType==='bigVertical'? styles.logoImageBig : styles.logoImageSmall} />
            <h1 className={logoType === 'bigVertical' ? styles.logoText : styles.logoTextSmall}>WinterVIBES</h1>
        </div>
    )
};

export default Logo;