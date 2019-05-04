import React from 'react'
import styles from './Routes.module.scss'

const Routes = ({ easy, medium, hard }) => {

    // const easy = easy==='brak danych' ? '-' : easy
    const sum = (isNaN(parseInt(easy)) ? 0 : parseInt(easy) )
                + (isNaN(parseInt(medium)) ? 0 : parseInt(medium))
                + (isNaN(parseInt(hard)) ? 0 : parseInt(hard))

    return(
        <div className={styles.container}>
            <h3>DŁUGOŚĆ TRAS: {sum + ' KM'}</h3>
            <div className={styles.easy}>{easy}</div>
            <div className={styles.medium}>{medium}</div>
            <div className={styles.hard}>{hard}</div>
        </div>
    )
}
export default Routes
