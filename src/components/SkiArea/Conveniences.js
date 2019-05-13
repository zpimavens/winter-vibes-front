import React from 'react'
import styles from './Conveniences.module.scss'

const Conv = ({ additional })=>{

    const { nightRide, skiSchool, snowpark, skiRental } = additional

    return(
        <ul className={styles.wrapper}>
            { nightRide === true && <li>  NOCNA JAZDA</li>}
            { skiSchool === true && <li>  SZKÓŁKA NARCIARSKA</li>}
            { snowpark === true && <li>  SNOWPARK</li>}
            { skiRental === true && <li>  WYPOŻYCZALNIA SPRZĘTU</li>}
        </ul>
    )
}

export default Conv
