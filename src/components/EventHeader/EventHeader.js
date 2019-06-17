import React, { useContext } from 'react'
import AppContext from '../../context'
import styles from './EventHeader.module.scss'

const EventHeader = ()=>{

    const context = useContext(AppContext)
    const start = new Date(context.startDate)
    const end = new Date(context.endDate)

    return(
        
        <div
            className={styles.container}
        >
            <h2>{context.name}</h2>
            <p className={styles.italic}>{context.description}</p>
            {/* <p>Wydarzenie{context.isPrivate ? ' prywatne' : ' publiczne'}</p> */}
            <p>Początek:  {start.getDate()}/{start.getMonth()+1}/{start.getFullYear()}, {start.getHours()}:{start.getMinutes() === 0 ? '00' : start.getMinutes()}</p>
            <p>Koniec:  {end.getDate()}/{end.getMonth()+1}/{end.getFullYear()}, {end.getHours()}:{end.getMinutes() === 0 ? '00' : end.getMinutes()}</p>
            <p>{context.skiArena && 'Gdzie jedziemy? '+context.skiArena}</p>
        </div>
 
    )
}
export default EventHeader
