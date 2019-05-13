import React from 'react'
import styles from './Routes.module.scss'

const Routes = ({ easy, medium, hard }) => {

    // const easy = easy==='brak danych' ? '-' : easy
    const sum = (isNaN(parseInt(easy)) ? 0 : parseInt(easy) )
                + (isNaN(parseInt(medium)) ? 0 : parseInt(medium))
                + (isNaN(parseInt(hard)) ? 0 : parseInt(hard))

    return(
        <div className={styles.container}>
            <h3>DŁUGOŚĆ TRAS: {sum===0? '?':sum + ' KM'}</h3>
            <div 
                className={styles.easy}
                title='Trasy niebieskie'
            >
                {easy==='brak danych\n' ? '?' : easy}
            </div>
            <div 
                className={styles.medium}
                title='Trasy czerwone'
            >
                {medium==="brak danych\n" ? '?' : medium}
            </div>
            <div 
                className={styles.hard}
                title='Trasy czarne'
            >
                {hard==="brak danych\n"?'?':hard}
            </div>
        </div>
    )
}
export default Routes
