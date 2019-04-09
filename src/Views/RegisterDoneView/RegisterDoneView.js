import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../ActivationView/ActivationView.module.scss';

const ActivationView = () => (
    <div className={styles.wrapper}>
        <h1>Dzięki za rejestrację!</h1>
        <h2>Aktywuj Swoje konto, link znajdziesz w swojej skrzynce pocztowej.</h2>
        <h2>Nie dostałeś maila z linkiem akttywacyjnym? Kliknij <Link className={styles.link} to='/#'>tutaj</Link>, a wyślemy go ponownie.</h2>
    
    </div>
)

export default ActivationView;