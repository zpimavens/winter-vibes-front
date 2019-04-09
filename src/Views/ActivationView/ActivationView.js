import React from 'react';
import {Link} from 'react-router-dom';
import styles from './ActivationView.module.scss';

const ActivationView = ()=>(
    <div className={styles.wrapper}>
        <h1>Dzięki za rejestrację!</h1>
        <h2>Twoje konto jest już aktywne.</h2>
        <Link className={styles.link} to='/login'>Kliknij tutaj by się zalogować!</Link>

    </div>
)

export default ActivationView;