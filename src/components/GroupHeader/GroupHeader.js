import React from 'react'
import AppContext from '../../context'
import styles from './GroupHeader.module.scss'

const GroupHeader = ()=>{

    return(
        <AppContext.Consumer>
            {context=>(
                <div
                    className={styles.container}
                >
                    <h2>{context.name}</h2>
                    <p>{context.description}</p>
                    <p>Grupa{context.isPrivate ? ' zamknięta' : ' otwarta'}</p>
                </div>
            )}
        </AppContext.Consumer>
    )
}
export default GroupHeader
