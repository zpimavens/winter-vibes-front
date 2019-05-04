import React from 'react'
import styles from './Page404.module.scss'
import image404 from '../../assets/images/error404-image.jpg'

const Page404 = ()=>(
    <div className={styles.container}>
        <h1>404</h1>
        <h2>Nie mogliśmy znaleźć tego czego szukasz.</h2>
        <img src={image404} alt='404' />
    </div>
)

export default Page404
