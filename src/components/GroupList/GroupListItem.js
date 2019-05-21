import React from 'react'
import styles from './GroupListItem.module.scss'
import AppContext from '../../context';

const GroupListItem = ({ name, description, owner })=>{
    return(
        <AppContext.Consumer>
            {(context=>(
                <div
                    className={styles.wrapper}
                    onClick={()=>alert(`Grupa: `+name)}
                >
                    <h5>{name}</h5>
                    <p>{description}</p>
                    <p>{context.user.username===owner ? "Właściciel" : "Członek"}</p>
                </div>

            ))}
        </AppContext.Consumer>
    )
}
export default GroupListItem