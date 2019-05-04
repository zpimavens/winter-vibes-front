import React from 'react'
import styles from './Conveniences.module.scss'



const Conv = ({ additional })=>{

    const { nightride, school, snowpark, rental } = additional;

    return(
        <ul className={styles.wrapper}>
            { nightride === true && <li>  NOCNA JAZDA</li>}
            { school === true && <li>  SZKÓŁKA NARCIARSKA</li>}
            { snowpark === true && <li>  SNOWPARK</li>}
            { rental === true && <li>  WYPOŻYCZALNIA SPRZĘTU</li>}
        </ul>
    )
}

export default Conv
