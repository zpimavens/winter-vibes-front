import React from 'react'
import AppContext from '../../context';
import styles from './GroupListItem.module.scss'
import { FaLock, FaLockOpen } from 'react-icons/fa'

const GroupListItem = ({ name, description, owner, isPrivate, onClick })=>{
    return(
        <AppContext.Consumer>
            {(context=>(
                <li
                    className={styles.wrapper}
                    onClick={onClick}
                >
                    <h4>{name} <span > {isPrivate ? <FaLock /> : <FaLockOpen />}</span></h4>
                    <p>{description}</p>
                    <p>{context.user.username===owner ? "Właściciel" : "Członek"}</p>
                </li>

            ))}
        </AppContext.Consumer>
    )
}
export default GroupListItem