import React from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/logo.png'
import styles from './Logo.module.scss'

const Logo = ({logoType})=>(
    <div 
        className={logoType==='bigVertical' ? styles.wrapperBig : styles.wrapperSmall}
    >
        <img 
            src={logo} 
            alt='WinterVibes logo.' 
            className={logoType==='bigVertical'? styles.logoImageBig : styles.logoImageSmall} 
        />
        <h1 
            className={logoType === 'bigVertical' ? styles.logoText : styles.logoTextSmall}>WinterVIBES
        </h1>
    </div>
)

Logo.propTypes={
    logoType: PropTypes.oneOf(['bigVertical', 'smallHorizontal']).isRequired,
}
export default Logo
